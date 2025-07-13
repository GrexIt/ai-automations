import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  ToggleButtonGroup,
  ToggleButton,
  IconButton
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AddIcon from '@mui/icons-material/Add';

import ConditionSelector from './ConditionSelector';
import AIAgentBlock from './AIAgentBlock';
import { compactInputStyles } from './styles/formStyles';

interface IfConditionCardProps {
  conditionType: string;
  conditions: Array<{id: string, type: string, value: string}>;
  aiAgentType: string;
  handleConditionTypeChange: (event: React.MouseEvent<HTMLElement>, newType: string | null) => void;
  handleAiAgentTypeChange: (newType: string) => void;
  setConditions: (conditions: Array<{id: string, type: string, value: string}>) => void;
}

const IfConditionCard: React.FC<IfConditionCardProps> = ({
  conditionType,
  conditions,
  aiAgentType,
  handleConditionTypeChange,
  handleAiAgentTypeChange,
  setConditions
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
    <Card variant="outlined" sx={{ mb: 3, p: 2, borderRadius: 2, boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.08)' }}>
      {/* Filter icon with If text - vertically aligned */}
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
          sx={{ 
            '& .MuiToggleButton-root': { py: 0.5, px: 1.5, minHeight: '30px' },
            border: '1px solid #e0e0e0',
            borderRadius: 1
          }}
        >
          <ToggleButton 
            value="traditional" 
            aria-label="traditional conditions"
            sx={{ 
              backgroundColor: conditionType === 'traditional' ? '#f0f0f0' : 'transparent',
              fontWeight: conditionType === 'traditional' ? 600 : 400
            }}
          >
            STANDARD
          </ToggleButton>
          <ToggleButton 
            value="ai" 
            aria-label="ai agents"
            sx={{ 
              display: 'flex', 
              gap: 0.5,
              backgroundColor: conditionType === 'ai' ? '#f0f0f0' : 'transparent',
              fontWeight: conditionType === 'ai' ? 600 : 400
            }}
          >
            <AutoAwesomeIcon fontSize="small" />
            AI AGENT
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      
      {/* Condition button - aligned with the When component's Select */}
      {(conditionType === 'traditional' && conditions.length === 0) || 
       (conditionType === 'ai' && !aiAgentType) ? (
        <Box sx={{ pl: 5, mb: 2, backgroundColor: '#f6f8fe', borderRadius: '20px', py: 0.6, px: 1.2, display: 'inline-flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                cursor: 'pointer'
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
          <AIAgentBlock 
            onAgentTypeChange={handleAiAgentTypeChange}
            selectedAgentType={aiAgentType}
          />
        </Box>
      ) : null}
    </Card>
  );
};

export default IfConditionCard;
