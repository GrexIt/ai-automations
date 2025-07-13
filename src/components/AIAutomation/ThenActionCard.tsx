import React from 'react';
import {
  Box,
  Typography,
  Card,
  ToggleButtonGroup,
  ToggleButton,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import StandardActionSelector from './StandardActionSelector';
import AIActionSelectorContainer from './AIActionSelectorContainer';

interface ThenActionCardProps {
  actionType: string;
  standardAction: string;
  showAiActionSelector: boolean;
  selectedAiAction: string;
  handleActionTypeChange: (event: React.MouseEvent<HTMLElement>, newType: string | null) => void;
  setStandardAction: (action: string) => void;
  setShowAiActionSelector: (show: boolean) => void;
  handleAiActionSelect: (actionId: string) => void;
  renderSelectedAiAction: () => React.ReactNode;
}

const ThenActionCard: React.FC<ThenActionCardProps> = ({
  actionType,
  standardAction,
  showAiActionSelector,
  selectedAiAction,
  handleActionTypeChange,
  setStandardAction,
  setShowAiActionSelector,
  handleAiActionSelect,
  renderSelectedAiAction
}) => {
  return (
    <Card variant="outlined" sx={{ mb: 3, p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AssignmentTurnedInIcon sx={{ mr: 2, color: '#6c49b8' }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Then</Typography>
        </Box>
        
        {/* Toggle between standard and AI actions */}
        <ToggleButtonGroup
          value={actionType}
          exclusive
          onChange={handleActionTypeChange}
          size="small"
          aria-label="action type"
          sx={{ 
            '& .MuiToggleButton-root': { py: 0.5, px: 1.5, minHeight: '30px' },
            border: '1px solid #e0e0e0',
            borderRadius: 1
          }}
        >
          <ToggleButton 
            value="standard" 
            aria-label="standard actions"
            sx={{ 
              backgroundColor: actionType === 'standard' ? '#f0f0f0' : 'transparent',
              fontWeight: 400
            }}
          >
            STANDARD
          </ToggleButton>
          <ToggleButton 
            value="ai" 
            aria-label="ai actions"
            sx={{ 
              display: 'flex', 
              gap: 0.5,
              backgroundColor: actionType === 'ai' ? '#f0f0f0' : 'transparent',
              fontWeight: 400
            }}
          >
            <AutoAwesomeIcon fontSize="small" />
            AI AGENT
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      
      {/* Add Action button - styled like Condition button in IfConditionCard */}
      {actionType === 'standard' && !standardAction ? (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', pl: 5, mb: 2 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#f6f8fe', borderRadius: '20px', py: 0.6, px: 1.2 }}>
            <IconButton 
              onClick={() => setStandardAction('send_email')}
              size="small"
              disableRipple
              sx={{ 
                backgroundColor: 'primary.main', 
                color: 'white',
                '&:hover': { backgroundColor: 'primary.main' },
                width: 22,
                height: 22,
                minHeight: 0,
                padding: '3px',
                fontSize: '0.8rem',
                borderRadius: '50%',
                mr: 0.8
              }}
            >
              <AddIcon sx={{ fontSize: '16px' }} />
            </IconButton>
            <Typography 
              onClick={() => setStandardAction('send_email')}
              sx={{ 
                color: 'primary.main',
                fontWeight: 500,
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              Action
            </Typography>
          </Box>
        </Box>
      ) : actionType === 'ai' && !showAiActionSelector && !selectedAiAction ? (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', pl: 5, mb: 2 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#f6f8fe', borderRadius: '20px', py: 0.6, px: 1.2 }}>
            <IconButton 
              onClick={() => setShowAiActionSelector(true)}
              size="small"
              disableRipple
              sx={{ 
                backgroundColor: 'primary.main', 
                color: 'white',
                '&:hover': { backgroundColor: 'primary.main' },
                width: 22,
                height: 22,
                minHeight: 0,
                padding: '3px',
                fontSize: '0.8rem',
                borderRadius: '50%',
                mr: 0.8
              }}
            >
              <AddIcon sx={{ fontSize: '16px' }} />
            </IconButton>
            <Typography 
              onClick={() => setShowAiActionSelector(true)}
              sx={{ 
                color: 'primary.main',
                fontWeight: 500,
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              Action
            </Typography>
          </Box>
        </Box>
      ) : null}
      
      {/* Display appropriate content based on condition type and state */}
      {actionType === 'standard' && standardAction ? (
        // Standard actions UI
        <Box sx={{ pl: 5 }}>
          <StandardActionSelector
            standardAction={standardAction}
            setStandardAction={setStandardAction}
          />
        </Box>
      ) : actionType === 'ai' && (showAiActionSelector || selectedAiAction) ? (
        // AI actions UI with progressive disclosure
        <Box sx={{ pl: 5 }}>
          <AIActionSelectorContainer 
            showAiActionSelector={showAiActionSelector}
            selectedAiAction={selectedAiAction}
            setShowAiActionSelector={setShowAiActionSelector}
            handleAiActionSelect={handleAiActionSelect}
            renderSelectedAiAction={renderSelectedAiAction}
          />
        </Box>
      ) : null}
    </Card>
  );
};

export default ThenActionCard;
