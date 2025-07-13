import React from 'react';
import {
  Box,
  Typography,
  Card,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
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
  return (
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
  );
};

export default IfConditionCard;
