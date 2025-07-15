import React from 'react';
import {
  Box,
  Typography,
  Card,
  IconButton,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AddIcon from '@mui/icons-material/Add';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import StandardActionSelector from '../StandardActionSelector';
import AIActionSelectorContainer from '../AIActionSelectorContainer';
import AIAgentBlock, { Email } from '../AIAgentBlock';

interface ExtractionField {
  name: string;
  description: string;
  examples: string;
}

interface ThenBlockProps {
  blockId: string;
  actionType: string;
  standardAction: string;
  showAiActionSelector: boolean;
  selectedAiAction: string;
  selectedAgentType: string;
  extractionSources?: {
    subject: boolean;
    body: boolean;
    attachments: boolean;
  };
  extractionFields?: ExtractionField[];
  selectedEmails?: Email[];
  handleActionTypeChange: (event: React.MouseEvent<HTMLElement>, newType: string | null) => void;
  setStandardAction: (action: string) => void;
  setShowAiActionSelector: (show: boolean) => void;
  handleAiActionSelect: (actionId: string) => void;
  renderSelectedAiAction: () => React.ReactNode;
  onAgentTypeChange?: (agentType: string) => void;
  onExtractionSourcesChange?: (sources: {subject: boolean, body: boolean, attachments: boolean}) => void;
  onExtractionFieldsChange?: (fields: ExtractionField[]) => void;
  onSelectedEmailsChange?: (emails: Email[]) => void;
  onDeleteBlock: (blockId: string) => void;
}

const ThenBlock: React.FC<ThenBlockProps> = ({
  blockId,
  actionType,
  standardAction,
  showAiActionSelector,
  selectedAiAction,
  selectedAgentType,
  extractionSources,
  extractionFields,
  selectedEmails = [],
  handleActionTypeChange,
  setStandardAction,
  setShowAiActionSelector,
  handleAiActionSelect,
  renderSelectedAiAction,
  onAgentTypeChange,
  onExtractionSourcesChange,
  onExtractionFieldsChange,
  onSelectedEmailsChange,
  onDeleteBlock
}) => {
  return (
    <Card 
      variant="outlined" 
      sx={{ 
        mb: 3, 
        p: 2, 
        borderRadius: 2, 
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.08)',
        position: 'relative'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AssignmentTurnedInIcon sx={{ color: '#6c49b8', fontSize: '1.2rem' }} />
          </Box>
          <Box sx={{ width: 8 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Then</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Toggle between standard and AI actions */}
          <ToggleButtonGroup
            value={actionType}
            exclusive
            onChange={handleActionTypeChange}
            size="small"
            aria-label="action type"
            sx={{ 
              '& .MuiToggleButton-root': { 
                py: 0.1, 
                px: 2, 
                minHeight: '22px',
                transition: 'all 0.15s ease',
                fontWeight: 500,
                fontSize: '0.75rem',
                border: 'none',
                color: '#5f6368',
                '&.Mui-selected': {
                  color: '#202124',
                }
              },
              bgcolor: '#f1f3f4',
              borderRadius: 3,
              p: 0.2,
              mr: 1
            }}
          >
            <ToggleButton 
              value="standard" 
              aria-label="standard actions"
              disableRipple
              sx={{ 
                bgcolor: actionType === 'standard' ? '#fff' : 'transparent',
                boxShadow: actionType === 'standard' ? '0px 1px 1px rgba(0, 0, 0, 0.03)' : 'none',
                borderRadius: 2,
                mr: 0.1,
              }}
            >
              BASIC
            </ToggleButton>
            <ToggleButton 
              value="agent" 
              aria-label="ai action"
              disableRipple
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: 0.5,
                bgcolor: actionType === 'agent' ? '#fff' : 'transparent',
                boxShadow: actionType === 'agent' ? '0px 1px 1px rgba(0, 0, 0, 0.03)' : 'none',
                borderRadius: 2,
              }}
            >
              <AutoAwesomeIcon sx={{ fontSize: '0.7rem' }} />
              AI ACTION
            </ToggleButton>
          </ToggleButtonGroup>

          <IconButton 
            size="small" 
            onClick={() => onDeleteBlock(blockId)}
            sx={{ color: '#999', '&:hover': { color: '#f44336' } }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      
      {/* Add Action button */}
      {actionType === 'standard' && !standardAction ? (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', pl: 5, mb: 1.5 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#f6f8fe', borderRadius: '18px', py: 0.3, px: 0.8 }}>
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
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              Action
            </Typography>
          </Box>
        </Box>
      ) : null}
      
      {/* Display appropriate content based on action type and state */}
      {actionType === 'standard' && standardAction ? (
        // Standard actions UI
        <Box sx={{ pl: 5 }}>
          <StandardActionSelector
            standardAction={standardAction}
            setStandardAction={setStandardAction}
          />
        </Box>
      ) : actionType === 'agent' ? (
        // AI Action UI (renamed from AI Agent)
        <Box sx={{ pl: 5 }}>
          <AIAgentBlock
            selectedAgentType={selectedAgentType || ''}
            onAgentTypeChange={onAgentTypeChange || (() => {})}
            extractionSources={extractionSources}
            onExtractionSourcesChange={onExtractionSourcesChange}
            extractionFields={extractionFields}
            onExtractionFieldsChange={onExtractionFieldsChange}
            selectedEmails={selectedEmails}
            onSelectedEmailsChange={onSelectedEmailsChange}
          />
        </Box>
      ) : null}
    </Card>
  );
};

export default ThenBlock;
