import { ProjectAnalyticsResponseType } from "@/features/projects/api/use-get-project-analytics";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { AnalyticsCard } from "./analytics-card";
import { DottedSeperator } from "./dotted-seperated";

export const Analytics = ({
    data
}: ProjectAnalyticsResponseType) => {
    return (
        <ScrollArea className="border rounded-lg w-full whitespace-nowrap shrink-0">
            <div className="w-full flex flex-row">
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Tasks"
                        value={data.taskCount}
                        variant={data.taskDifference > 0 ? "up" : "down"}
                        increaseValue={data.taskDifference}
                    />
                    <DottedSeperator direction="vertical"/>
                </div>
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Assigned Tasks"
                        value={data.assignedTaskCount}
                        variant={data.assignedTaskDifference > 0 ? "up" : "down"}
                        increaseValue={data.assignedTaskDifference}
                    />
                    <DottedSeperator direction="vertical"/>
                </div>
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Complete Tasks"
                        value={data.completedTaskCount}
                        variant={data.completedTaskDifference > 0 ? "up" : "down"}
                        increaseValue={data.completedTaskDifference}
                    />
                    <DottedSeperator direction="vertical"/>
                </div>
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Overdue Tasks"
                        value={data.overdueTaskCount}
                        variant={data.overdueTaskDifference > 0 ? "up" : "down"}
                        increaseValue={data.overdueTaskDifference}
                    />
                    <DottedSeperator direction="vertical"/>
                </div>
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Incomplete Tasks"
                        value={data.incompleteTaskCount}
                        variant={data.incompleteTaskDifference > 0 ? "up" : "down"}
                        increaseValue={data.incompleteTaskDifference}
                    />
                    <DottedSeperator direction="vertical"/>
                </div>
            </div>
            <ScrollBar orientation="horizontal"/>
        </ScrollArea>
    )
}