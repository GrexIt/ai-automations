import React from 'react';
import {
  Box,
  Typography,
  Drawer,
  IconButton,
  Divider,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

interface DummyEmail {
  id: string;
  subject: string;
  tag: string;
  time: string;
}

interface TestResult {
  step: string;
  status: 'pending' | 'success' | 'failed';
}

interface TestPanelDrawerProps {
  isTestPanelOpen: boolean;
  handleCloseTestPanel: () => void;
  testStep: string;
  selectedEmail: string | null;
  dummyEmails: DummyEmail[];
  handleSelectEmail: (id: string) => void;
  handlePickAnotherEmail: () => void;
  testResults: TestResult[];
  conditionType: string;
  conditions: Array<{id: string, type: string, value: string}>;
  aiAgentType: string;
  actionType: string;
  standardAction: string;
  selectedAiAction: string;
}

const TestPanelDrawer: React.FC<TestPanelDrawerProps> = ({
  isTestPanelOpen,
  handleCloseTestPanel,
  testStep,
  selectedEmail,
  dummyEmails,
  handleSelectEmail,
  handlePickAnotherEmail,
  testResults,
  conditionType,
  conditions,
  aiAgentType,
  actionType,
  standardAction,
  selectedAiAction
}) => {
  return (
    <Drawer
      anchor="right"
      open={isTestPanelOpen}
      onClose={handleCloseTestPanel}
      sx={{
        '& .MuiDrawer-paper': { width: { xs: '100%', sm: '450px' }, padding: 2 },
        '& .MuiBackdrop-root': { backgroundColor: 'rgba(0, 0, 0, 0)' }, // Transparent backdrop
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Drawer Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
          <Typography variant="h6">
            Test conversation
            {testStep === 'running_test' && selectedEmail && 
              <Typography component="span" color="text.secondary" sx={{ ml: 1, fontSize: '0.9rem' }}>
                {dummyEmails.find(email => email.id === selectedEmail)?.subject}
              </Typography>
            }
          </Typography>
          <IconButton onClick={handleCloseTestPanel}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        
        {/* Test Panel Content */}
        <Box sx={{ pt: 2, flex: 1, overflow: 'auto' }}>
          {testStep === 'select_email' ? (
            /* Email Selection UI */
            <Box>
              <Typography variant="subtitle1" gutterBottom>Conversation</Typography>
              
              {/* Search Box */}
              <TextField
                fullWidth
                placeholder="Search by conversation ID"
                variant="outlined"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small">
                        <CancelIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Recent open conversations in all inboxes
              </Typography>
              
              {/* Email List */}
              <List sx={{ pt: 0 }}>
                {dummyEmails.map(email => (
                  <ListItem 
                    key={email.id}
                    onClick={() => handleSelectEmail(email.id)}
                    sx={{ 
                      mb: 1, 
                      border: '1px solid #e0e0e0', 
                      borderRadius: 1, 
                      '&:hover': { backgroundColor: '#f5f5f5', cursor: 'pointer' } 
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <Box 
                            sx={{ 
                              width: 8, 
                              height: 8, 
                              borderRadius: '50%', 
                              backgroundColor: 'green',
                              mr: 1 
                            }} 
                          />
                          <Typography variant="body2" color="text.secondary">
                            {email.tag}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                            {email.subject}
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Typography variant="caption" color="text.secondary">
                              {email.time}
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          ) : (
            /* Test Results UI */
            <Box>
              <Box 
                sx={{ 
                  backgroundColor: '#f0faf0', 
                  p: 2, 
                  borderRadius: 1, 
                  mb: 3 
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1">All actions would've been applied</Typography>
                </Box>
                <Typography variant="body2">All conditions and actions passed.</Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  Passed
                  <Box 
                    sx={{ 
                      ml: 1, 
                      bgcolor: '#e0e0e0', 
                      px: 1, 
                      borderRadius: 5, 
                      fontSize: '0.8rem' 
                    }}
                  >
                    {testResults.filter(r => r.status === 'success').length}
                  </Box>
                </Typography>
                
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Conditions</Typography>
                <Box 
                  sx={{ 
                    p: 2, 
                    border: '1px solid #e0e0e0', 
                    borderRadius: 1, 
                    display: 'flex', 
                    alignItems: 'center',
                    mb: 2
                  }}
                >
                  <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                  {conditionType === 'traditional' ? (
                    <Typography>Subject contains "{conditions.length > 0 ? conditions[0].type : ''}"</Typography>
                  ) : (
                    <Typography>AI Agent: {aiAgentType.charAt(0).toUpperCase() + aiAgentType.slice(1)}</Typography>
                  )}
                </Box>
                
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Actions</Typography>
                <Box 
                  sx={{ 
                    p: 2, 
                    border: '1px solid #e0e0e0', 
                    borderRadius: 1, 
                    display: 'flex', 
                    alignItems: 'center' 
                  }}
                >
                  <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                  {actionType === 'standard' ? (
                    <Typography>{standardAction || 'Add label'}</Typography>
                  ) : (
                    <Typography>AI Action: {selectedAiAction || 'Summarize'}</Typography>
                  )}
                </Box>
              </Box>
              
              <List>
                {testResults.map((result, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {result.status === 'pending' && <HourglassEmptyIcon color="disabled" />}
                      {result.status === 'success' && <CheckCircleIcon color="success" />}
                      {result.status === 'failed' && <CancelIcon color="error" />}
                    </ListItemIcon>
                    <ListItemText 
                      primary={result.step} 
                      secondary={result.status === 'pending' && 'In progress...'}
                    />
                    {result.status === 'pending' && (
                      <CircularProgress size={16} thickness={5} />
                    )}
                  </ListItem>
                ))}
              </List>
              
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                <Button 
                  variant="outlined"
                  onClick={handlePickAnotherEmail}
                >
                  Pick another conversation
                </Button>
                
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => {
                    handleSelectEmail(selectedEmail || '1');
                  }}
                >
                  Test again
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default TestPanelDrawer;
