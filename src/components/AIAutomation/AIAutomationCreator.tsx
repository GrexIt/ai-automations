import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  MenuItem,
  Select,
  FormControl,
  Card,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Drawer,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  InputAdornment,
  Collapse
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import FolderIcon from '@mui/icons-material/Folder';
import EventIcon from '@mui/icons-material/Event';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Import our components
import AIAgentBlock from './AIAgentBlock';
import AIAssist from './AIAssist';
import AIActionSelector from './AIActionSelector';
import ConditionSelector from './ConditionSelector';
import StandardActionSelector from './StandardActionSelector';
import AIActionSelectorContainer from './AIActionSelectorContainer';
import { compactInputStyles } from './styles/formStyles';

const AIAutomationCreator: React.FC = () => {
  // Styles imported at the top of the file
  
  const [automationName, setAutomationName] = useState('');
  const [triggerType, setTriggerType] = useState('new_conversation');
  const [conditions, setConditions] = useState<Array<{id: string, type: string, value: string}>>([]);
  const [conditionType, setConditionType] = useState('traditional'); // 'traditional' or 'ai'
  const [aiAgentType, setAiAgentType] = useState('extraction');
  
  // Action state
  const [actionType, setActionType] = useState('standard'); // 'standard' or 'ai'
  const [standardAction, setStandardAction] = useState('');
  const [selectedAiAction, setSelectedAiAction] = useState('');
  const [showAiActionSelector, setShowAiActionSelector] = useState(false);
  
  // Test panel state
  const [isTestPanelOpen, setIsTestPanelOpen] = useState(false);
  const [testStep, setTestStep] = useState<'select_email' | 'running_test'>('select_email');
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Array<{step: string; status: 'pending' | 'success' | 'failed'}>>([
    { step: 'Checking conditions', status: 'pending' },
    { step: 'Applying AI extraction', status: 'pending' },
    { step: 'Generating response', status: 'pending' },
  ]);
  
  // State for AI Insights panel expansion
  const [isInsightsPanelExpanded, setIsInsightsPanelExpanded] = useState(false);
  
  // Dummy email data for testing
  const dummyEmails = [
    { id: '1', subject: 'Security alert', from: 'security@example.com', time: '9h ago', tag: 'Support' },
    { id: '2', subject: 'Kiran, finish setting up your OnePlus 9 Pro 5G', from: 'support@oneplus.com', time: '2w ago', tag: 'Support' },
    { id: '3', subject: 'Account Activation', from: 'noreply@example.com', time: '2w ago', tag: 'Support' },
    { id: '4', subject: 'Email ID Verification', from: 'verify@example.com', time: '2w ago', tag: 'Support' },
  ];
  
  // Handle opening the test panel
  const handleOpenTestPanel = () => {
    setIsTestPanelOpen(true);
    setTestStep('select_email');
    setSelectedEmail(null);
    setTestResults([
      { step: 'Checking conditions', status: 'pending' },
      { step: 'Applying AI extraction', status: 'pending' },
      { step: 'Generating response', status: 'pending' },
    ]);
  };
  
  // Handle selecting an email for testing
  const handleSelectEmail = (emailId: string) => {
    setSelectedEmail(emailId);
    setTestStep('running_test');
    
    // Simulate test progress with delayed status updates
    setTimeout(() => {
      setTestResults(prev => [
        { ...prev[0], status: 'success' },
        { ...prev[1], status: 'pending' },
        { ...prev[2], status: 'pending' },
      ]);
      
      setTimeout(() => {
        setTestResults(prev => [
          { ...prev[0], status: 'success' },
          { ...prev[1], status: 'success' },
          { ...prev[2], status: 'pending' },
        ]);
        
        setTimeout(() => {
          setTestResults(prev => [
            { ...prev[0], status: 'success' },
            { ...prev[1], status: 'success' },
            { ...prev[2], status: 'success' },
          ]);
        }, 1500);
      }, 1500);
    }, 1500);
  };
  
  // Handle closing the test panel
  const handleCloseTestPanel = () => {
    setIsTestPanelOpen(false);
  };
  
  // Handle selecting another conversation for testing
  const handlePickAnotherEmail = () => {
    setTestStep('select_email');
    setSelectedEmail(null);
  };
  
  const handleConditionTypeChange = (_event: React.MouseEvent<HTMLElement>, newType: string | null) => {
    if (newType !== null) {
      setConditionType(newType);
    }
  };
  
  const handleAiAgentTypeChange = (newType: string) => {
    setAiAgentType(newType);
  };
  
  const handleActionTypeChange = (_event: React.MouseEvent<HTMLElement>, newType: string | null) => {
    if (newType !== null) {
      setActionType(newType);
      if (newType === 'ai') {
        setShowAiActionSelector(true);
      }
    }
  };
  
  const handleAiActionSelect = (actionId: string) => {
    setSelectedAiAction(actionId);
    setShowAiActionSelector(false);
  };
  
  // Function to render the selected AI action card
  const renderSelectedAiAction = () => {
    const actionMap: Record<string, { title: string, description: string }> = {
      'summarize': { title: 'Summarize', description: 'Create a concise summary of the conversation' },
      'draft_response': { title: 'Draft Response', description: 'Generate a response based on conversation context' },
      'categorize': { title: 'Categorize', description: 'Analyze and categorize the conversation type' },
      'sentiment': { title: 'Sentiment Analysis', description: 'Detect customer sentiment from conversation' },
      'custom_prompt': { title: 'Custom Prompt', description: 'Create your own AI instruction' }
    };
    
    const action = actionMap[selectedAiAction];
    if (!action) return null;
    
    return (
      <Card variant="outlined" sx={{ mb: 2, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AutoAwesomeIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="subtitle1">{action.title}</Typography>
          </Box>
          <Box>
            <IconButton size="small" onClick={() => setShowAiActionSelector(true)}>
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary">{action.description}</Typography>
      </Card>
    );
  };

  // AI insights data for the automation
  const aiInsights = {
    suggestions: [
      "Adding sentiment analysis could improve response priority",
      "Consider extracting customer intent for better routing",
      "This automation could benefit from classification of request type"
    ],
    optimizations: [
      "AI extraction would be 85% faster than manual review",
      "Similar automations have reduced response time by 37%"
    ]
  };
  
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        maxWidth: '1100px',
        mx: 'auto',
        p: 2,
        gap: 3
      }}
    >
      {/* Main automation content */}
      <Box sx={{ 
        flex: 1, 
        minWidth: 0, // Important for flex child to not overflow
        maxWidth: isTestPanelOpen ? '65%' : '75%' 
      }}>
        <Box sx={{ mt: 2, mb: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton sx={{ mr: 1 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5">Create new automation</Typography>
          </Box>
          
          {/* Test conversation button */}
          <Button 
            variant="outlined" 
            color="primary"
            onClick={handleOpenTestPanel}
            startIcon={<PlayArrowIcon />}
          >
            Test conversation
          </Button>
        </Box>

        {/* Automation Name */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', textAlign: 'left' }}>Name</Typography>
          <TextField
            fullWidth
            placeholder="Name"
            value={automationName}
            onChange={(e) => setAutomationName(e.target.value)}
            sx={compactInputStyles}
            InputProps={{
              endAdornment: (
                <Typography variant="body2" color="text.secondary">
                  {automationName.length}/100
                </Typography>
              ),
            }}
          />
        </Box>

        {/* When Section */}
        <Card variant="outlined" sx={{ mb: 3, p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <EventIcon color="primary" sx={{ mr: 2 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>When</Typography>
          </Box>
          
          <Box sx={{ pl: 5 }}>
            <FormControl fullWidth variant="outlined">
              <Select
                value={triggerType}
                onChange={(e) => setTriggerType(e.target.value)}
                displayEmpty
                renderValue={() => "New conversation (inbound) is received"}
                sx={{ 
                  ...compactInputStyles,
                  '& .MuiSelect-select': { 
                    display: 'flex', 
                    alignItems: 'center'
                  }
                }}
              >
                <MenuItem value="new_conversation">New conversation (inbound) is received</MenuItem>
                <MenuItem value="outbound_email">Outbound email is sent</MenuItem>
                <MenuItem value="tag_added">Tag is added</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Card>

        {/* If Section */}
        <Card variant="outlined" sx={{ mb: 3, p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FilterAltIcon color="primary" sx={{ mr: 2 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>If</Typography>
            </Box>
            
            {/* Toggle between traditional and AI conditions */}
            <ToggleButtonGroup
              value={conditionType}
              exclusive
              onChange={handleConditionTypeChange}
              size="small"
              aria-label="condition type"
              sx={{ '& .MuiToggleButton-root': { py: 0.5, px: 1.5, minHeight: '30px' } }}
            >
              <ToggleButton value="traditional" aria-label="traditional conditions">
                STANDARD
              </ToggleButton>
              <ToggleButton 
                value="ai" 
                aria-label="ai agents"
                sx={{ display: 'flex', gap: 0.5 }}
              >
                <AutoAwesomeIcon fontSize="small" />
                AI AGENT
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          
          {conditionType === 'traditional' ? (
            // Traditional conditions UI
            <Box 
              sx={{ 
                pl: 5, 
                backgroundColor: '#f5f8ff', 
                borderRadius: 1, 
                p: 2 
              }}
            >
              <ConditionSelector 
                conditions={conditions} 
                onConditionsChange={setConditions}
                compactInputStyles={compactInputStyles}
              />
            </Box>
          ) : (
            // AI Agent conditions UI
            <Box sx={{ pl: 5 }}>
              <AIAgentBlock 
                onAgentTypeChange={handleAiAgentTypeChange}
                selectedAgentType={aiAgentType}
              />
            </Box>
          )}
        </Card>

        {/* Then Section */}
        <Card variant="outlined" sx={{ mb: 3, p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AssignmentTurnedInIcon color="primary" sx={{ mr: 2 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Then</Typography>
            </Box>
            
            {/* Toggle between standard and AI actions */}
            <ToggleButtonGroup
              value={actionType}
              exclusive
              onChange={handleActionTypeChange}
              size="small"
              aria-label="action type"
              sx={{ '& .MuiToggleButton-root': { py: 0.5, px: 1.5, minHeight: '30px' } }}
            >
              <ToggleButton value="standard" aria-label="standard actions">
                STANDARD
              </ToggleButton>
              <ToggleButton 
                value="ai" 
                aria-label="ai actions"
                sx={{ display: 'flex', gap: 0.5 }}
              >
                <AutoAwesomeIcon fontSize="small" />
                AI ACTION
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          
          <Box sx={{ pl: 5 }}>
            {actionType === 'standard' ? (
              // Standard actions UI
              <StandardActionSelector
                standardAction={standardAction}
                setStandardAction={setStandardAction}
              />
            ) : (
              // AI actions UI with progressive disclosure
              <AIActionSelectorContainer 
                showAiActionSelector={showAiActionSelector}
                selectedAiAction={selectedAiAction}
                setShowAiActionSelector={setShowAiActionSelector}
                handleAiActionSelect={handleAiActionSelect}
                renderSelectedAiAction={renderSelectedAiAction}
              />
            )}
          </Box>
        </Card>

        {/* Save Button */}
        <Box sx={{ mt: 4 }}>
          <Button 
            variant="contained" 
            color="primary"
            disabled={!automationName}
            sx={{ 
              textTransform: 'none', 
              backgroundColor: '#f0f4f9', 
              color: '#637381' 
            }}
          >
            Save and enable
          </Button>
        </Box>
        </Box>
      </Box>
      
      {/* AI Insights Panel - Collapses when test panel is open */}
      {!isTestPanelOpen && (
        <Box 
          sx={{ 
            width: '300px', 
            display: { xs: 'none', md: 'block' } 
          }}
        >
          <Card variant="outlined" sx={{ position: 'sticky', top: 16 }}>
            {/* AI Insights Header - Always visible */}
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center', 
                p: 2,
                cursor: 'pointer',
                backgroundColor: isInsightsPanelExpanded ? '#f9fafc' : 'transparent',
                '&:hover': { backgroundColor: '#f9fafc' }
              }}
              onClick={() => setIsInsightsPanelExpanded(!isInsightsPanelExpanded)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ 
                  display: 'inline-flex',
                  borderRadius: '50%',
                  backgroundColor: '#f0f4ff',
                  p: 1,
                  mr: 1
                }}>
                  <AutoAwesomeIcon color="primary" fontSize="small" />
                </Box>
                <Box>
                  <Typography variant="h6">AI Insights</Typography>
                  {!isInsightsPanelExpanded && (
                    <Typography variant="caption" color="text.secondary">
                      {aiInsights.suggestions.length + aiInsights.optimizations.length} insights available
                    </Typography>
                  )}
                </Box>
              </Box>
              {isInsightsPanelExpanded ? 
                <ExpandLessIcon color="action" /> : 
                <ExpandMoreIcon color="action" />
              }
            </Box>
            
            {/* Collapsible content */}
            <Collapse in={isInsightsPanelExpanded}>
              <Box sx={{ p: 2, pt: 0 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, mt: 2, color: 'text.secondary' }}>Suggestions</Typography>
                <List dense sx={{ pl: 0 }}>
                  {aiInsights.suggestions.map((suggestion, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        <AutoAwesomeIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={suggestion} primaryTypographyProps={{ variant: 'body2' }} />
                    </ListItem>
                  ))}
                </List>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>Optimizations</Typography>
                <List dense sx={{ pl: 0 }}>
                  {aiInsights.optimizations.map((optimization, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={optimization} primaryTypographyProps={{ variant: 'body2' }} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Collapse>
          </Card>
          
          {/* AI Assist Chat Component */}
          <AIAssist compactInputStyles={compactInputStyles} />
        </Box>
      )}
      
      {/* Test Panel Drawer */}
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
    </Box>
  );
};

export default AIAutomationCreator;
