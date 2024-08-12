import React, { ChangeEvent, FormEvent, useRef, useState } from "react"
import Link from "next/link"
import { monacoInstanceState } from "@/atoms/editor"
import { editorAction, uploadFile } from "@/utils/editor"
import { GET } from "@/utils/http.utils"
import { useAtomValue } from "jotai"
import { ImageIcon, Loader2Icon, SearchIcon } from "lucide-react"
import { toast } from "sonner"
import { type Photos as UnsplashPhotos } from "unsplash-js/dist/methods/search/types/response"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ImageWithSkeleton from "@/components/image-with-skeleton"

export type UnsplashImageResponse = UnsplashPhotos["results"][number]

interface UnsplashSearchFormData {
  unsplash_image_query: string
  orientation: string
}

const UnsplashDialog = () => {
  const monacoInstance = useAtomValue(monacoInstanceState)

  const [isUploadingFile, setIsUploadingFile] = useState(false)
  const [unsplashDialogOpen, setUnsplashDialogOpen] = useState(false)
  let imageQueries = ["minimalism", "nature", "mountains", "sky", "city"]
  let unsplashRandomQuery =
    imageQueries[Math.floor(Math.random() * imageQueries.length)]
  let [unsplashImages, setUnsplashImages] = useState<UnsplashImageResponse[]>(
    []
  )
  const uploadFileInputRef = useRef<HTMLInputElement>(null)

  async function handleUploadFile(event: ChangeEvent<HTMLInputElement>) {
    setIsUploadingFile(true)
    uploadFile(event)
      .then((res) => {
        // insert to the editor
        editorAction.insertText(res.markdown, monacoInstance!)
        setIsUploadingFile(false)
      })
      .catch((err) => {
        setIsUploadingFile(false)
        toast.error(err.message)
      })
  }

  const getUnsplashImages = async (query: string, orientation: string) => {
    const images = await GET<any>(
      `/api/unsplash?query=${query}&orientation=${orientation}`,
      {
        error: "Could not fetch images from Unsplash",
        showErrorToast: true,
      }
    )

    if (images.error) {
      toast.error(images.message)
      return
    }

    setUnsplashImages(images)
  }

  function handleUnsplashSearch(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    const formData = new FormData(event.currentTarget as HTMLFormElement)
    const data: UnsplashSearchFormData = {
      unsplash_image_query: "",
      orientation: "",
    }

    formData.forEach(
      (value, key) =>
        (data[key as keyof UnsplashSearchFormData] = value as string)
    )

    const { unsplash_image_query, orientation } = data

    getUnsplashImages(unsplash_image_query, orientation)
  }

  return (
    <>
      <Button
        disabled={isUploadingFile}
        variant="outline"
        className="relative h-10"
        onClick={() => {
          uploadFileInputRef.current?.click()
        }}
      >
        {isUploadingFile && (
          <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
        )}{" "}
        {isUploadingFile ? "Uploading" : "Upload"} file
      </Button>
      <Input
        onChange={handleUploadFile}
        type="file"
        ref={uploadFileInputRef}
        className="sr-only"
        accept="image/*,video/*"
      />
      <Dialog open={unsplashDialogOpen} onOpenChange={setUnsplashDialogOpen}>
        <Button
          variant="outline"
          className="relative flex h-10 w-full justify-center px-6"
          onClick={() => {
            setUnsplashDialogOpen(true)
            if (unsplashImages.length > 0) return
            getUnsplashImages(unsplashRandomQuery, "landscape")
          }}
        >
          <ImageIcon className=" absolute left-4 h-3.5 w-3.5" /> Unsplash search
        </Button>
        <DialogContent className="flex h-[600px] flex-col px-6">
          <form onSubmit={handleUnsplashSearch}>
            <div className="flex">
              <Link
                href={`https://unsplash.com/?utm_source=${siteConfig.short_name}&utm_medium=referral`}
                target="_blank"
                className="flex h-full w-1/2 justify-start hover:opacity-70"
              >
                <h1 className="font-heading text-xl">Unsplash</h1>
              </Link>
              <div className="flex h-full w-1/2 justify-end">
                <Select name="orientation" defaultValue="landscape">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Landscape" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="landscape">Landscape</SelectItem>
                    <SelectItem value="portrait">Portrait</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="relative mt-4 flex items-center">
              <SearchIcon className="absolute left-4 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search image and press enter..."
                className="h-11 pl-10"
                name="unsplash_image_query"
                autoComplete="off"
                spellCheck={false}
                autoFocus
              />
            </div>
          </form>
          <div className=" grid h-[550px] w-full grid-cols-1  gap-3 overflow-scroll py-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-5">
            {unsplashImages.map((image) => (
              <ImageWithSkeleton
                key={image.id}
                image={image as any}
                className="cursor-pointer rounded-md"
                onClick={() => {
                  // Insert to the editor
                  editorAction.insertText(
                    `![${image.alt_description}](${image.urls.regular})`,
                    monacoInstance!
                  )
                  setUnsplashDialogOpen(false)
                }}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default UnsplashDialog
