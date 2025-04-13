interface ScheduleRule {
  timeString: string;
  cron: string;
}

const schedulerRules: Record<string, ScheduleRule> = {
  History: { timeString: "9:00 AM", cron: "0 9 * * 1-5" },
  Fitness: { timeString: "6:00 PM", cron: "0 18 * * 6,0" },
  Tech: { timeString: "11:00 AM", cron: "0 11 * * 1,3,5" },
};

export const getScheduleRule = (niche: string): ScheduleRule => {
  return schedulerRules[niche] || { timeString: "12:00 PM", cron: "0 12 * * *" };
};