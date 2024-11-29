import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { TASK } from "../types";

import { enUS } from 'date-fns/locale';
import { addMonths, format, getDay, parse, startOfWeek, subMonths } from "date-fns";
import { useState } from "react";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./data-calendar.css";
import { EventCard } from "./event-card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const locales = {
    "en-US": enUS
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

interface DataCalendarProps{
    data: TASK[];
}

interface CustomToolbarProps{
    data: Date;
    onNavigate: (action: "PREV" | "NEXT" | "TODAY") => void;
}

const CustomToolbar = ({ onNavigate, data }: CustomToolbarProps) => {
    return (
        <div className="flex mb-4 gap-x-2 w-full items-center lg:w-auto justify-center lg:justify-end">
            <Button
                onClick={() => onNavigate("PREV")}
                variant="secondary"
                size="icon"
            >
                <ChevronLeftIcon className="size-4"/>
            </Button>
            <div className="flex items-center border border-input rounded-md px-3 py-2 h-8 justify-center w-full lg:w-auto">
                <CalendarIcon className="size-4 mr-2" />
                <p className="text-sm">{format(data, "MMMM yyyy")}</p>
            </div>
            <Button
                onClick={() => onNavigate("NEXT")}
                variant="secondary"
                size="icon"
            >
                <ChevronRightIcon className="size-4"/>
            </Button>
        </div>
    )
 }

export const DataCalendar = ({
    data }: DataCalendarProps) => {
    const [value, setValue] = useState(
        data.length>0 ? new Date(data[0].dueDate) : new Date()
    );

    const events = data.map((task) => ({
        start: new Date(task.dueDate),
        end: new Date(task.dueDate),
        title: task.name,
        project: task.project,
        assignee: task.assignee,
        status: task.status,
        id: task.$id,
    }));

    const handleNavigate = (action: "PREV" | "NEXT" | "TODAY") => {
        if (action === "PREV") {
            setValue(subMonths(value, 1));
        } else if (action === "NEXT") {
            setValue(addMonths(value, 1));
        } else {
            setValue(new Date());
        }
    }
    return (
        <Calendar
            localizer={localizer}
            date={value}
            events={events}
            views={["month"]}
            defaultView="month"
            toolbar
            showAllEvents
            className="h-full"
            max={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
            formats={{
                weekdayFormat: (date, culture, localizer) => localizer?.format(date, "EEE", culture) ?? "",
            }}
            components={{
                eventWrapper: ({ event }) => (
                    <EventCard
                        id={event.id}
                        title={event.title}
                        assignee={event.assignee}
                        project={event.project}
                        status={event.status}
                    />
                ),
                toolbar: () => (
                    <CustomToolbar onNavigate={handleNavigate} data={value} />
                )
            }}
        />
    )
 }