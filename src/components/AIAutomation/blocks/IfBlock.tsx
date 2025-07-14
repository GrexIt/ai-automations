import React from 'react';
import {
  Box,
  Typography,
  Card,
  IconButton
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ConditionSelector from '../ConditionSelector';
import { compactInputStyles } from '../styles/formStyles';

interface IfBlockProps {
  blockId: string;
  conditionType: string;
  conditions: Array<{id: string, type: string, value: string}>;
  aiAgentType: string;
  handleConditionTypeChange: (event: React.MouseEvent<HTMLElement>, newType: string | null) => void;
  handleAiAgentTypeChange: (newType: string) => void;
  setConditions: (conditions: Array<{id: string, type: string, value: string}>) => void;
  onDeleteBlock: (blockId: string) => void;
}

const IfBlock: React.FC<IfBlockProps> = ({
  blockId,
  conditionType,
  conditions,
  aiAgentType,
  handleConditionTypeChange,
  handleAiAgentTypeChange,
  setConditions,
  onDeleteBlock
}) => {
  // Add a new condition
  const handleAddCondition = () => {
    if (conditionType === 'traditional') {
      const newCondition = {
        id: `condition-${Date.now()}`,
        type: '',
        value: ''
      };
      setConditions([...conditions, newCondition]);
    } else {
      // For AI agent, just configure it
      handleAiAgentTypeChange(aiAgentType || 'email_analyzer');
    }
  };
  
  return (
    <Card 
      variant="outlined" 
      sx={{ 
        mb: 1, 
        p: 1.2, 
        borderRadius: 2, 
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.08)',
        position: 'relative'
      }}
    >
      {/* Block Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.7, justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FilterAltIcon sx={{ mr: 1.5, color: '#6c49b8', fontSize: '1.1rem' }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>If</Typography>
        </Box>
        <IconButton 
          size="small" 
          onClick={() => onDeleteBlock(blockId)}
          sx={{ color: '#999', '&:hover': { color: '#f44336' } }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
        
      {/* Condition button */}
      {(conditionType === 'traditional' && conditions.length === 0) || 
      (conditionType === 'ai' && !aiAgentType) ? (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', pl: 5, mb: 2 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#f6f8fe', borderRadius: '18px', py: 0.3, px: 0.8 }}>
            <IconButton 
              onClick={handleAddCondition}
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
              onClick={handleAddCondition}
              sx={{ 
                color: 'primary.main',
                fontWeight: 500,
                fontSize: '0.9rem',
                cursor: 'pointer',
                ml: 0.5
              }}
            >
              Condition
            </Typography>
          </Box>
        </Box>
      ) : null}
      
      {/* Display condition content only when conditions exist or AI agent is configured */}
      {conditionType === 'traditional' && conditions.length > 0 ? (
        // Traditional conditions UI
        <Box sx={{ pl: 5 }}>
          <Box 
            sx={{ 
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
        </Box>
      ) : conditionType === 'ai' && aiAgentType ? (
        // AI Agent conditions UI
        <Box sx={{ pl: 5 }}>
          {/* <AIAgentBlock 
            onAgentTypeChange={handleAiAgentTypeChange}
            selectedAgentType={aiAgentType}
          /> */}
        </Box>
      ) : null}
    </Card>
  );
};

export default IfBlock;
