"use client";

import * as React from 'react';
import TaskComponent from '../components/Tasks/taskComponent'; // Adjust the import path as necessary
import AppTheme from '../shared-theme/AppTheme';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import SideMenu from '../components/SideMenu';

import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from '../theme/customizations';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};


export default function TaskPage({disableCustomTheme = false}) {
  return (
    <AppTheme disableCustomTheme={disableCustomTheme} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      
      <main className="flex min-h-screen bg-white">
        
        <SideMenu />

        
        <Box
          component="section"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: alpha(theme.palette.background.default, 1),
            overflow: 'auto',
            transition: 'all 0.3s',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 10,
              mt: { xs: 8, md: 0 },
            }}
          >
            
            <TaskComponent />
          </Stack>
        </Box>
      </main>
    </AppTheme>
  );
}
