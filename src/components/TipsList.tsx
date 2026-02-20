import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, Minus, ArrowDown } from "lucide-react";
import type { ImprovementTip } from "@/types/ats";

const impactConfig = {
  high: { icon: ArrowUp, label: "High Impact", className: "bg-score-red/10 text-score-red border-score-red/20" },
  medium: { icon: Minus, label: "Medium", className: "bg-score-yellow/10 text-score-yellow border-score-yellow/20" },
  low: { icon: ArrowDown, label: "Low", className: "bg-score-green/10 text-score-green border-score-green/20" },
};

const TipsList = ({ tips }: { tips: ImprovementTip[] }) => {
  const grouped = {
    high: tips.filter((t) => t.impact === "high"),
    medium: tips.filter((t) => t.impact === "medium"),
    low: tips.filter((t) => t.impact === "low"),
  };

  return (
    <div className="space-y-4">
      {(["high", "medium", "low"] as const).map((level) =>
        grouped[level].length > 0 ? (
          <div key={level} className="space-y-2">
            {grouped[level].map((tip, i) => {
              const config = impactConfig[level];
              const Icon = config.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.08 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-card/60 border border-border/50"
                >
                  <Badge variant="outline" className={`${config.className} shrink-0 gap-1 text-xs`}>
                    <Icon className="w-3 h-3" />
                    {config.label}
                  </Badge>
                  <div>
                    <p className="text-sm font-medium">{tip.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{tip.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : null,
      )}
    </div>
  );
};

export default TipsList;
