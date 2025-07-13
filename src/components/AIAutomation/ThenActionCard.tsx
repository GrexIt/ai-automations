import React from 'react';
import {
  Box,
  Typography,
  Card,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
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
            AI AGENT
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
  );
};

export default ThenActionCard;
