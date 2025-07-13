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
  IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

// Import our new AIAgentBlock component
import AIAgentBlock from './AIAgentBlock';
import AIActionSelector from './AIActionSelector';

const AIAutomationCreator: React.FC = () => {
  const [automationName, setAutomationName] = useState('');
  const [triggerType, setTriggerType] = useState('new_conversation');
  const [condition, setCondition] = useState('');
  const [conditionType, setConditionType] = useState('traditional'); // 'traditional' or 'ai'
  const [aiAgentType, setAiAgentType] = useState('extraction');
  
  // Action state
  const [actionType, setActionType] = useState('standard'); // 'standard' or 'ai'
  const [standardAction, setStandardAction] = useState('');
  const [selectedAiAction, setSelectedAiAction] = useState('');
  const [showAiActionSelector, setShowAiActionSelector] = useState(false);
  
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
    <Container maxWidth="md">
      <Box sx={{ mt: 2, mb: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <IconButton sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5">Create new automation</Typography>
        </Box>

        {/* Automation Name */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Automation name</Typography>
          <TextField
            fullWidth
            placeholder="Automation name"
            value={automationName}
            onChange={(e) => setAutomationName(e.target.value)}
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
            <PlayArrowIcon color="primary" sx={{ mr: 2 }} />
            <Typography variant="subtitle1">When</Typography>
          </Box>
          
          <Box sx={{ pl: 5 }}>
            <FormControl fullWidth variant="outlined">
              <Select
                value={triggerType}
                onChange={(e) => setTriggerType(e.target.value)}
                displayEmpty
                renderValue={() => "New conversation (inbound) is received"}
                sx={{ 
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
              <RadioButtonUncheckedIcon color="primary" sx={{ mr: 2 }} />
              <Typography variant="subtitle1">If</Typography>
            </Box>
            
            {/* Toggle between traditional and AI conditions */}
            <ToggleButtonGroup
              value={conditionType}
              exclusive
              onChange={handleConditionTypeChange}
              size="small"
              aria-label="condition type"
            >
              <ToggleButton value="traditional" aria-label="traditional conditions">
                Traditional
              </ToggleButton>
              <ToggleButton 
                value="ai" 
                aria-label="ai agents"
                sx={{ display: 'flex', gap: 1 }}
              >
                <AutoAwesomeIcon fontSize="small" />
                AI Agent
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
              <FormControl fullWidth variant="outlined" sx={{ mb: 1 }}>
                <Select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  displayEmpty
                  renderValue={() => "Select condition"}
                  sx={{ backgroundColor: 'white' }}
                >
                  <MenuItem value="subject_contains">Subject contains</MenuItem>
                  <MenuItem value="from_email">From email</MenuItem>
                  <MenuItem value="body_contains">Body contains</MenuItem>
                </Select>
              </FormControl>
              
              <Button 
                startIcon={<AddIcon />} 
                sx={{ color: 'text.secondary' }}
              >
                OR condition
              </Button>
              
              <Box sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<AddIcon />}
                  sx={{ width: '100%', borderStyle: 'dashed' }}
                >
                  + AND condition
                </Button>
              </Box>
            </Box>
          ) : (
            // AI Agent conditions UI
            <Box sx={{ pl: 5 }}>
              <AIAgentBlock 
                onAgentTypeChange={handleAiAgentTypeChange}
                selectedAgentType={aiAgentType}
              />
              
              <Box sx={{ pl: 2, mt: 2 }}>
                <Button 
                  startIcon={<AddIcon />} 
                  sx={{ color: 'text.secondary' }}
                >
                  OR another AI agent
                </Button>
              </Box>
            </Box>
          )}
        </Card>

        {/* Then Section */}
        <Card variant="outlined" sx={{ mb: 3, p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircleOutlineIcon color="primary" sx={{ mr: 2 }} />
              <Typography variant="subtitle1">Then</Typography>
            </Box>
            
            {/* Toggle between standard and AI actions */}
            <ToggleButtonGroup
              value={actionType}
              exclusive
              onChange={handleActionTypeChange}
              size="small"
              aria-label="action type"
            >
              <ToggleButton value="standard" aria-label="standard actions">
                Standard
              </ToggleButton>
              <ToggleButton 
                value="ai" 
                aria-label="ai actions"
                sx={{ display: 'flex', gap: 1 }}
              >
                <AutoAwesomeIcon fontSize="small" />
                AI Action
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          
          <Box sx={{ pl: 5 }}>
            {actionType === 'standard' ? (
              // Standard actions UI
              <Box 
                sx={{ 
                  backgroundColor: '#f5f8ff', 
                  borderRadius: 1, 
                  p: 2 
                }}
              >
                <FormControl fullWidth variant="outlined" sx={{ mb: 1 }}>
                  <Select
                    value={standardAction}
                    onChange={(e) => setStandardAction(e.target.value)}
                    displayEmpty
                    renderValue={() => "Select action"}
                    sx={{ backgroundColor: 'white' }}
                  >
                    <MenuItem value="send_email">Send email</MenuItem>
                    <MenuItem value="add_label">Add label</MenuItem>
                    <MenuItem value="assign_to">Assign to</MenuItem>
                    <MenuItem value="create_task">Create task</MenuItem>
                  </Select>
                </FormControl>
                
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<AddIcon />}
                  sx={{ mt: 2, width: '100%', borderStyle: 'dashed' }}
                >
                  + Add another action
                </Button>
              </Box>
            ) : (
              // AI actions UI with progressive disclosure
              <Box>
                {showAiActionSelector ? (
                  <AIActionSelector onSelect={handleAiActionSelect} />
                ) : selectedAiAction ? (
                  // Show the selected AI action
                  <Box>
                    {renderSelectedAiAction()}
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<AddIcon />}
                      sx={{ width: '100%', borderStyle: 'dashed' }}
                      onClick={() => setShowAiActionSelector(true)}
                    >
                      + Add another AI action
                    </Button>
                  </Box>
                ) : (
                  // Show initial action selection prompt
                  <Box 
                    sx={{ 
                      backgroundColor: '#f8f5ff', 
                      borderRadius: 1, 
                      p: 2,
                      textAlign: 'center'
                    }}
                  >
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      Select an AI-powered action to automate your workflow
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AutoAwesomeIcon />}
                      onClick={() => setShowAiActionSelector(true)}
                    >
                      Choose AI Action
                    </Button>
                  </Box>
                )}
              </Box>
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
    </Container>
  );
};

export default AIAutomationCreator;
