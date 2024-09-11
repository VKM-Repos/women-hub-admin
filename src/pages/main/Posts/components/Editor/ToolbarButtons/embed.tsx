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
import { Code } from 'lucide-react';

type Props = {
  editor?: Editor | null;
};

export function Embed(editor: Props) {
  const form = useForm();
  const [youtubeUrl, setYoutubeUrl] = useState<string>('');

  // Function to extract video ID and validate the URL
  const getYouTubeEmbedUrl = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : null;
  };

  const onSubmit = (data: { videoUrl: string }) => {
    const embedUrl = getYouTubeEmbedUrl(data.videoUrl);
    if (embedUrl) {
      setYoutubeUrl(embedUrl);
    } else {
      console.error('Invalid YouTube URL');
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
          <DialogTitle>Embed YouTube Video</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6 p-6">
          {/* Section 1: YouTube Preview */}
          <div className="youtube-preview mb-4">
            {youtubeUrl ? (
              <iframe
                width="100%"
                height="250"
                src={youtubeUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube video preview"
              />
            ) : (
              <p>No video to preview. Paste a YouTube URL below.</p>
            )}
          </div>

          {/* Section 2: Form Input for YouTube URL */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-y-6"
            >
              <CustomFormField
                label="YouTube Video URL"
                control={form.control}
                name="videoUrl"
                placeholder="Paste YouTube link here"
                fieldType={FormFieldType.INPUT}
              />

              <div className="flex w-full place-content-end">
                <Button
                  variant="secondary"
                  size="lg"
                  type="submit"
                  className="w-fit"
                >
                  Add Video
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
