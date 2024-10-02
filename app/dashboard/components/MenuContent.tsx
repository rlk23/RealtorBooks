import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import Link from 'next/link';  // Import Next.js Link component

const mainListItems = [
  { text: 'Dashboard', icon: <HomeRoundedIcon />, href: '/dashboard' },
  { text: 'Activity', icon: <AnalyticsRoundedIcon />, href: '/dashboard/activities' },
  { text: 'Clients', icon: <PeopleRoundedIcon />, href: '/dashboard/clients' },
  { text: 'Tasks', icon: <AssignmentRoundedIcon />, href: '/dashboard/tasks' },
  { text: 'Schedule', icon: <ScheduleRoundedIcon />, href: '/dashboard/calendar' },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon />, href: '/dashboard/settings' },
  { text: 'Feedback', icon: <HelpRoundedIcon />, href: '/dashboard/feedback' },
];

export default function MenuContent() {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      {/* Main list items */}
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <Link href={item.href} passHref>
              <ListItemButton component="a" selected={index === 0}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>

      {/* Secondary list items */}
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <Link href={item.href} passHref>
              <ListItemButton component="a">
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
