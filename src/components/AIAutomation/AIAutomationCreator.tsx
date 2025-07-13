import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

// Import our components
import AIInsightsPanel from './AIInsightsPanel';
import IfConditionCard from './IfConditionCard';
import ThenActionCard from './ThenActionCard';
import TestPanelDrawer from './TestPanelDrawer';
import WhenTriggerCard from './WhenTriggerCard';
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
        <WhenTriggerCard 
          triggerType={triggerType}
          setTriggerType={setTriggerType}
        />

        {/* If Section */}
        <IfConditionCard
          conditionType={conditionType}
          conditions={conditions}
          aiAgentType={aiAgentType}
          handleConditionTypeChange={handleConditionTypeChange}
          handleAiAgentTypeChange={handleAiAgentTypeChange}
          setConditions={setConditions}
        />

        {/* Then Section */}
        <ThenActionCard
          actionType={actionType}
          standardAction={standardAction}
          showAiActionSelector={showAiActionSelector}
          selectedAiAction={selectedAiAction}
          handleActionTypeChange={handleActionTypeChange}
          setStandardAction={setStandardAction}
          setShowAiActionSelector={setShowAiActionSelector}
          handleAiActionSelect={handleAiActionSelect}
          renderSelectedAiAction={renderSelectedAiAction}
        />

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
        <AIInsightsPanel
          isInsightsPanelExpanded={isInsightsPanelExpanded}
          setIsInsightsPanelExpanded={setIsInsightsPanelExpanded}
        />
      )}
      
      {/* Test Panel Drawer */}
      <TestPanelDrawer
        isTestPanelOpen={isTestPanelOpen}
        handleCloseTestPanel={handleCloseTestPanel}
        testStep={testStep}
        selectedEmail={selectedEmail}
        dummyEmails={dummyEmails}
        handleSelectEmail={handleSelectEmail}
        handlePickAnotherEmail={handlePickAnotherEmail}
        testResults={testResults}
        conditionType={conditionType}
        conditions={conditions}
        aiAgentType={aiAgentType}
        actionType={actionType}
        standardAction={standardAction}
        selectedAiAction={selectedAiAction}
      />
    </Box>
  );
};

export default AIAutomationCreator;
