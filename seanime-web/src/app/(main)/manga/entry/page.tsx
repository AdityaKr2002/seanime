"use client"
import { useMangaEntry, useMangaEntryDetails } from "@/app/(main)/manga/_lib/queries"
import { MetaSection } from "@/app/(main)/manga/entry/_containers/meta-section"
import { CustomBackgroundImage } from "@/components/shared/custom-ui/custom-background-image"
import { PageWrapper } from "@/components/shared/styling/page-wrapper"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter, useSearchParams } from "next/navigation"
import React from "react"

export default function Page() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const mediaId = searchParams.get("id")
    const { mangaEntry, mangaEntryLoading } = useMangaEntry(mediaId)
    const { mangaDetails, mangaDetailsLoading } = useMangaEntryDetails(mediaId)

    React.useEffect(() => {
        if (!mediaId) {
            router.push("/")
        } else if ((!mangaEntryLoading && !mangaEntry)) {
            router.push("/")
        }
    }, [mangaEntry, mangaEntryLoading])

    if (mangaEntryLoading || mangaDetailsLoading) return <LoadingDisplay />

    return (
        <div>
            {/*[CUSTOM UI]*/}
            <CustomBackgroundImage />

            <MetaSection entry={mangaEntry} details={mangaDetails} />

            <div className="px-4 md:px-8 relative z-[8]">

                <PageWrapper
                    className="relative 2xl:order-first pb-10 pt-4"
                    {...{
                        initial: { opacity: 0, y: 60 },
                        animate: { opacity: 1, y: 0 },
                        exit: { opacity: 0, y: 60 },
                        transition: {
                            type: "spring",
                            damping: 10,
                            stiffness: 80,
                            delay: 0.6,
                        },
                    }}
                >

                </PageWrapper>
            </div>

        </div>
    )
}

function LoadingDisplay() {
    return (
        <div className="__header h-[30rem]">
            <div
                className="h-[30rem] w-full flex-none object-cover object-center absolute top-0 overflow-hidden"
            >
                <div
                    className="w-full absolute z-[1] top-0 h-[15rem] bg-gradient-to-b from-[--background] to-transparent via"
                />
                <Skeleton className="h-full absolute w-full" />
                <div
                    className="w-full absolute bottom-0 h-[20rem] bg-gradient-to-t from-[--background] via-transparent to-transparent"
                />
            </div>
        </div>
    )
}