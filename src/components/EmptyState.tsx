import Heading from "./Heading";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Ain't Nobody Here but Us Chickens",
  subtitle = "Try changing or removing some of your filters",
  showReset
}) => {
  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subtitle={subtitle}/>
    </div>
  )
};

export default EmptyState;