"use client";

import React from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Event, Izin, User } from "@prisma/client";

type QueryEvent = Event & { izin: Izin[]; users: User[] };

export default function DayCard({
  event,
  active,
}: {
  event: { status: string; data: QueryEvent };
  active: boolean;
}) {
  return (
    <div
      className={cn(
        "w-full p-4 bg-card/30 rounded-md backdrop-blur hover:cursor-pointer hover:backdrop-contrast-75",
        active && "backdrop-contrast-75"
      )}
    >
      <div className="flex flex-col gap-4 justify-start w-full">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row flex-wrap items-start md:items-center justify-start gap-x-4 gap-y-2 h-full">
            <p className="text-base font-semibold">{event.data.title}</p>
            <div className="flex flex-row gap-2 items-center">
              {event.status === "izin" && (
                <Badge variant={"outline"}>
                  Izin{" "}
                  {event.data.izin[0].tipe.split("_").join(" ").toLowerCase()}
                </Badge>
              )}
              <Badge
                variant={
                  event.status === "hadir"
                    ? "default"
                    : event.status === "izin"
                    ? event.data.izin[0].status === "DITERIMA"
                      ? "default"
                      : "secondary"
                    : "destructive"
                }
              >
                {event.status === "izin"
                  ? `Izin ${event.data.izin[0].status.toLowerCase()}`
                  : event.status === "hadir"
                  ? "Hadir full"
                  : "Tidak hadir"}
              </Badge>
            </div>
          </div>
          {event.data.description && (
            <p className="text-sm line-clamp-2 opacity-70">
              {event.data.description}
            </p>
          )}
        </div>
      </div>
    </div>
    // <AlertDialog key={event.data.id}>
    //   <AlertDialogTrigger asChild>
    //     <div className="w-full p-4 bg-card/30 rounded-md backdrop-blur hover:cursor-pointer hover:backdrop-contrast-75">
    //       <div className="flex flex-col gap-4 justify-start w-full">
    //         <div className="flex flex-col gap-3">
    //           <div className="flex flex-row flex-wrap items-start md:items-center justify-start gap-x-4 gap-y-2 h-full">
    //             <p className="text-base font-semibold">{event.data.title}</p>
    //             <div className="flex flex-row gap-2 items-center">
    //               {event.status === "izin" && (
    //                 <Badge variant={"outline"}>
    //                   Izin{" "}
    //                   {event.data.izin[0].tipe
    //                     .split("_")
    //                     .join(" ")
    //                     .toLowerCase()}
    //                 </Badge>
    //               )}
    //               <Badge
    //                 variant={
    //                   event.status === "hadir"
    //                     ? "default"
    //                     : event.status === "izin"
    //                     ? event.data.izin[0].status === "DITERIMA"
    //                       ? "default"
    //                       : "secondary"
    //                     : "destructive"
    //                 }
    //               >
    //                 {event.status === "izin"
    //                   ? `Izin ${event.data.izin[0].status.toLowerCase()}`
    //                   : event.status === "hadir"
    //                   ? "Hadir full"
    //                   : "Tidak hadir"}
    //               </Badge>
    //             </div>
    //           </div>
    //           {event.data.description && (
    //             <p className="text-sm line-clamp-2 opacity-70">
    //               {event.data.description}
    //             </p>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </AlertDialogTrigger>
    //   <AlertDialogContent>
    //     <AlertDialogHeader>
    //       <AlertDialogTitle>{event.data.title}</AlertDialogTitle>
    //       <AlertDialogCancel asChild className="absolute top-1 right-0 mr-6">
    //         <Button variant={"ghost"} className="border-none" size={"icon"}>
    //           <XIcon size={16} className="shrink-0" />
    //         </Button>
    //       </AlertDialogCancel>
    //     </AlertDialogHeader>
    //     <AlertDialogDescription>
    //       {event.data.description}
    //     </AlertDialogDescription>
    //     <AlertDialogFooter className="w-full items-center flex flex-row">
    //       <Button variant={"outline"} className="w-full">
    //         Izin
    //       </Button>
    //       <Button className="w-full">Tandai Hadir</Button>
    //     </AlertDialogFooter>
    //   </AlertDialogContent>
    // </AlertDialog>
  );
}
