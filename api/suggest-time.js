import { getScheduleForNiche } from './schedulerRules';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { niche } = req.body;
    const schedule = getScheduleForNiche(niche);

    if (schedule) {
      res.status(200).json(schedule);
    } else {
      // Default schedule if no rule is found
      res.status(200).json({
        timeString: '12:00 PM',
        cron: '0 12 * * *',
      });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}