import React from 'react';
import {
  Box,
  Typography,
  Button
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AIActionSelector from './AIActionSelector';

interface AIActionSelectorContainerProps {
  showAiActionSelector: boolean;
  selectedAiAction: string;
  setShowAiActionSelector: (show: boolean) => void;
  handleAiActionSelect: (actionId: string) => void;
  renderSelectedAiAction: () => React.ReactNode;
}

const AIActionSelectorContainer: React.FC<AIActionSelectorContainerProps> = ({
  showAiActionSelector,
  selectedAiAction,
  setShowAiActionSelector,
  handleAiActionSelect,
  renderSelectedAiAction
}) => {
  return (
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
  );
};

export default AIActionSelectorContainer;
