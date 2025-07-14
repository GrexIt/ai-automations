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
import FlowContainer from './FlowContainer';
import TestPanelDrawer from './TestPanelDrawer';
import WhenTriggerCard from './WhenTriggerCard';
import { compactInputStyles } from './styles/formStyles';

const AIAutomationCreator: React.FC = () => {
  // Styles imported at the top of the file
  
  // Flow blocks state - for managing the sequence of If and Then blocks
  const [blocks, setBlocks] = useState<Array<{
    id: string;
    type: 'if' | 'then';
    // If block properties
    conditionType?: string;
    conditions?: Array<{id: string, type: string, value: string}>;
    aiAgentType?: string;
    // Then block properties
    actionType?: string;
    standardAction?: string;
    showAiActionSelector?: boolean;
    selectedAiAction?: string;
  }>>([{
    id: `block-${Date.now()}`,
    type: 'if',
    conditionType: 'traditional',
    conditions: [],
    aiAgentType: 'extraction'
  }, {
    id: `block-${Date.now() + 1}`,
    type: 'then',
    actionType: 'standard',
    standardAction: '',
    showAiActionSelector: false,
    selectedAiAction: ''
  }]);
  
  // For backward compatibility with the test panel
  // We'll use the first 'if' block and the first 'then' block for test panel
  const firstIfBlock = blocks.find(block => block.type === 'if') as {
    conditionType?: string;
    conditions?: Array<{id: string, type: string, value: string}>;
    aiAgentType?: string;
  } | undefined || { conditionType: 'traditional', conditions: [], aiAgentType: 'extraction' };
  
  const firstThenBlock = blocks.find(block => block.type === 'then') as {
    actionType?: string;
    standardAction?: string;
    selectedAiAction?: string;
    showAiActionSelector?: boolean;
  } | undefined || { actionType: 'standard', standardAction: '', selectedAiAction: '', showAiActionSelector: false };
  
  const conditionType = firstIfBlock.conditionType || 'traditional';
  const conditions = firstIfBlock.conditions || [];
  const aiAgentType = firstIfBlock.aiAgentType || 'extraction';
  
  const actionType = firstThenBlock.actionType || 'standard';
  const standardAction = firstThenBlock.standardAction || '';
  const selectedAiAction = firstThenBlock.selectedAiAction || '';
  const showAiActionSelector = firstThenBlock.showAiActionSelector || false;
  
  // State for automation name
  const [automationName, setAutomationName] = useState('');
  
  // State for trigger type
  const [triggerType, setTriggerType] = useState('new_conversation');
  
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
      const ifBlockIndex = blocks.findIndex(block => block.type === 'if');
      if (ifBlockIndex >= 0) {
        const newBlocks = [...blocks];
        newBlocks[ifBlockIndex] = { ...newBlocks[ifBlockIndex], conditionType: newType };
        setBlocks(newBlocks);
      }
    }
  };
  
  const handleAiAgentTypeChange = (newType: string) => {
    const ifBlockIndex = blocks.findIndex(block => block.type === 'if');
    if (ifBlockIndex >= 0) {
      const newBlocks = [...blocks];
      newBlocks[ifBlockIndex] = { ...newBlocks[ifBlockIndex], aiAgentType: newType };
      setBlocks(newBlocks);
    }
  };
  
  const handleActionTypeChange = (_event: React.MouseEvent<HTMLElement>, newType: string | null) => {
    if (newType !== null) {
      const thenBlockIndex = blocks.findIndex(block => block.type === 'then');
      if (thenBlockIndex >= 0) {
        const newBlocks = [...blocks];
        newBlocks[thenBlockIndex] = { ...newBlocks[thenBlockIndex], actionType: newType };
        if (newType === 'ai') {
          newBlocks[thenBlockIndex] = { ...newBlocks[thenBlockIndex], showAiActionSelector: true };
        }
        setBlocks(newBlocks);
      }
    }
  };
  
  const handleAiActionSelect = (actionId: string) => {
    const thenBlockIndex = blocks.findIndex(block => block.type === 'then');
    if (thenBlockIndex >= 0) {
      const newBlocks = [...blocks];
      newBlocks[thenBlockIndex] = { ...newBlocks[thenBlockIndex], selectedAiAction: actionId, showAiActionSelector: false };
      setBlocks(newBlocks);
    }
  };
  
  // Handle saving and enabling the automation
  const handleSaveAndEnable = () => {
    console.log('Saving automation:', {
      name: automationName,
      triggerType,
      blocks: blocks.map(block => ({
        type: block.type,
        ...(block.type === 'if' ? {
          conditionType: block.conditionType,
          conditions: block.conditions,
          aiAgentType: block.aiAgentType,
        } : {}),
        ...(block.type === 'then' ? {
          actionType: block.actionType,
          standardAction: block.standardAction,
          selectedAiAction: block.selectedAiAction
        } : {})
      }))
    });
    // Add actual save logic here
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
            <IconButton size="small" onClick={() => {
              const thenBlockIndex = blocks.findIndex(block => block.type === 'then');
              if (thenBlockIndex >= 0) {
                const newBlocks = [...blocks];
                newBlocks[thenBlockIndex] = { ...newBlocks[thenBlockIndex], showAiActionSelector: true };
                setBlocks(newBlocks);
              }
            }}>
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
            startIcon={<PlayArrowIcon sx={{ fontSize: '1rem' }} />}
            size="medium"
            sx={{ 
              py: 0.6, 
              px: 2, 
              fontSize: '0.85rem',
              textTransform: 'none'
            }}
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

        {/* Flow Container - replacing separate If and Then sections */}
        <FlowContainer 
          initialBlocks={blocks}
          onBlocksChange={setBlocks}
        />

        {/* Save Button */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="contained" 
            onClick={handleSaveAndEnable}
            disabled={!automationName}
            sx={{ 
              textTransform: 'none', 
              px: 3,
              py: 1,
              borderRadius: 100,
              fontWeight: 500,
              boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.15)',
              backgroundColor: '#4e6af3',
              color: 'white',
              '&:hover': {
                backgroundColor: '#3f56cc',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'
              }
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
