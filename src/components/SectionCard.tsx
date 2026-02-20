import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, Briefcase, GraduationCap, Search } from "lucide-react";
import type { SectionScore } from "@/types/ats";

const iconMap: Record<string, React.ElementType> = {
  "Skills Match": Target,
  "Experience Relevance": Briefcase,
  "Education Fit": GraduationCap,
  "Keywords Match": Search,
};

const SectionCard = ({ section, index }: { section: SectionScore; index: number }) => {
  const Icon = iconMap[section.name] || Target;

  const getBarColor = (score: number) => {
    if (score <= 40) return "bg-score-red";
    if (score <= 70) return "bg-score-yellow";
    return "bg-score-green";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
    >
      <Card className="border-0 shadow-md bg-card/80 backdrop-blur-sm">
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-semibold text-sm">{section.name}</h3>
            </div>
            <span className="text-lg font-bold font-display">{section.score}%</span>
          </div>
          <Progress value={section.score} className={`h-2 [&>div]:${getBarColor(section.score)}`} />
          <p className="text-xs text-muted-foreground mt-2">{section.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SectionCard;
