import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SelectContent from './SelectContent';
import MenuContent from './MenuContent';
import CardAlert from './CardAlert';
import OptionsMenu from './OptionsMenu';
import { useSession } from 'next-auth/react'; 

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  [`& .MuiDrawer-paper`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
}));

export default function SideMenu() {
  const { data: session, status } = useSession(); // Fetch session details

  if (status === 'loading') {
    return <div>Loading...</div>; // Show a loading state while session is being fetched
  }

  const userName = session?.user?.name || 'Guest'; // Use authenticated user name or default to 'Guest'
  const userEmail = session?.user?.email || 'guest@email.com'; // Use authenticated user email or default

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .MuiDrawer-paper`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          mt: 'calc(var(--template-frame-height, 0px) + 4px)',
          p: 1.5,
        }}
      >
       {/* <SelectContent />  */}
      </Box>
      <Divider />
      <MenuContent />
      {/*<CardAlert /> */}
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Avatar
          sizes="small"
          alt={userName}
          src={session?.user?.image || '/static/images/avatar/default.jpg'} // Use user's image or fallback
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: 'auto' }}>
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
            {userName} {/* Display the user's name */}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {userEmail} {/* Display the user's email */}
          </Typography>
        </Box>
         <OptionsMenu /> 
      </Stack>
    </Drawer>
  );
}
