import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Toggle } from '@/components/ui/toggle';
import { type Editor } from '@tiptap/react';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import CustomFormField, {
  FormFieldType,
} from '@/components/form/custom-form-fields';
import { Code, EyeIcon } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Icons } from '../icons';

type Props = {
  editor?: Editor | null;
};

type FormData = {
  videoUrl: string;
};

export function Embed({ editor }: Props) {
  const form = useForm<FormData>({
    defaultValues: {
      videoUrl: '',
    },
  });
  const [embedUrl, setEmbedUrl] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('youtube');

  // Functions to extract and validate video IDs from different platforms
  const getYouTubeEmbedUrl = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : null;
  };

  const getTwitterEmbedUrl = (url: string) => {
    // Implement Twitter URL validation logic
    return url ? `https://twitter.com/embed/${url}` : null;
  };

  const getFacebookEmbedUrl = (url: string) => {
    // Implement Facebook URL validation logic
    return url ? `https://facebook.com/embed/${url}` : null;
  };

  const onSubmit = (data: FormData) => {
    let embedUrl: string | null = null;

    if (activeTab === 'youtube') {
      embedUrl = getYouTubeEmbedUrl(data.videoUrl);
    } else if (activeTab === 'twitter') {
      embedUrl = getTwitterEmbedUrl(data.videoUrl);
    } else if (activeTab === 'facebook') {
      embedUrl = getFacebookEmbedUrl(data.videoUrl);
    }

    if (embedUrl && editor) {
      // editor.chain().focus().setEmbed({ src: embedUrl }).run();
      setEmbedUrl(embedUrl);
    } else {
      console.error('Invalid URL');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="border-none">
        <Toggle size="sm" aria-label="Embed" title="Embed">
          <Code className="h-5 w-5" />
        </Toggle>
      </DialogTrigger>
      <DialogContent className="w-full max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-start gap-5">
            <span>Embed Type</span>
            <Tabs
              defaultValue="youtube"
              onValueChange={value => setActiveTab(value)}
            >
              <TabsList className="flex w-fit items-center justify-center gap-1">
                <TabsTrigger value="youtube">
                  <Icons.youtube />
                </TabsTrigger>
                <TabsTrigger value="twitter">
                  <Icons.x />
                </TabsTrigger>
                <TabsTrigger value="facebook">
                  <Icons.facebook />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </DialogTitle>
        </DialogHeader>

        {/* Tab Content */}
        <div className="flex flex-col gap-6 p-6">
          {/* Section 1: Embed Preview */}
          <div className="bg-background mx-auto mb-4 flex h-[10rem] w-full items-center justify-center overflow-hidden rounded-md">
            {embedUrl ? (
              <iframe
                width="100%"
                height="250"
                src={embedUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embed preview"
              />
            ) : (
              <span className="mx-auto flex w-fit items-center gap-2 rounded-lg bg-white p-4 shadow-md">
                <EyeIcon />
                <p className="text-sm font-bold">{`Preview here`}</p>
              </span>
            )}
          </div>

          {/* Section 2: Form Input */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-y-6"
            >
              <CustomFormField
                label={`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} URL`}
                control={form.control}
                name="videoUrl"
                placeholder={`Paste ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} link here`}
                fieldType={FormFieldType.INPUT}
              />

              <div className="flex w-full place-content-end">
                <Button
                  variant="secondary"
                  size="lg"
                  type="submit"
                  className="w-fit"
                >
                  Add {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}{' '}
                  Embed
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
