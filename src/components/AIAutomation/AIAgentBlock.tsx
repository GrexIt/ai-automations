import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  TextField,
  Tooltip,
} from '@mui/material';
import ClassificationCategoriesConfig from './ClassificationCategoriesConfig';
import ExtractionFieldsConfig from './ExtractionFieldsConfig';
import SentimentAnalysisConfig from './SentimentAnalysisConfig';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import CategoryIcon from '@mui/icons-material/Category';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface ExtractionField {
  name: string;
  description: string;
  examples: string;
}

export interface Email {
  id: string;
  subject: string;
  from: string;
  date: string;
  selected: boolean;
}

export interface AIAgentType {
    value: string;
    label: string;
    icon: React.ReactNode;
    description: string;
  }
  
  interface AIAgentBlockProps {
    onAgentTypeChange: (agentType: string) => void;
    selectedAgentType: string;
    extractionSources?: {
      subject: boolean;
      body: boolean;
      attachments: boolean;
    };
    onExtractionSourcesChange?: (sources: {subject: boolean, body: boolean, attachments: boolean}) => void;
    extractionFields?: ExtractionField[];
    onExtractionFieldsChange?: (fields: ExtractionField[]) => void;
    selectedEmails?: Email[];
    onSelectedEmailsChange?: (emails: Email[]) => void;
  }
  
  export const AI_AGENT_TYPES: AIAgentType[] = [
    { 
      value: 'extraction', 
      label: 'Extraction', 
      icon: <TextFormatIcon />, 
      description: 'Extract specific data points from emails or messages' 
    },
    { 
      value: 'classification', 
      label: 'Classification', 
      icon: <CategoryIcon />, 
      description: 'Categorize messages into predefined classes' 
    },
    { 
      value: 'sentiment', 
      label: 'Sentiment Analysis', 
      icon: <SentimentSatisfiedAltIcon />, 
      description: 'Detect positive, negative, or neutral sentiment' 
    },
    { 
      value: 'custom', 
      label: 'Custom AI Agent', 
      icon: <SmartToyOutlinedIcon />, 
      description: 'Create a custom AI agent for specific tasks' 
    }
  ];
  
  const AIAgentBlock: React.FC<AIAgentBlockProps> = ({ 
    onAgentTypeChange, 
    selectedAgentType,
    extractionSources = {
      subject: true,
      body: true,
      attachments: false
    },
    onExtractionSourcesChange,
    selectedEmails = [],
    onSelectedEmailsChange,
    extractionFields = [{
      name: '',
      description: '',
      examples: ''
    }],
    onExtractionFieldsChange
  }) => {
    const [showAgentDetails, setShowAgentDetails] = useState(true);
    const [localClassificationCategories, setClassificationCategories] = useState(['']);
    const [sentimentThreshold, setSentimentThreshold] = useState(0.5);
    const [customPrompt, setCustomPrompt] = useState('');
    
    const handleSourceChange = (source: 'subject' | 'body' | 'attachments') => {
      if (onExtractionSourcesChange) {
        onExtractionSourcesChange({
          ...extractionSources,
          [source]: !extractionSources[source]
        });
      }
    };
  
    const toggleAgentDetails = () => {
      setShowAgentDetails(!showAgentDetails);
    };
  
    return (
      <Box sx={{ 
        backgroundColor: '#f8f5ff', 
        borderRadius: 1, 
        p: 2 
      }}>
        {/* AI Agent type selector */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            Select AI Agent Type
            <Tooltip title="AI Agents analyze content to perform specific tasks automatically">
              <InfoOutlinedIcon fontSize="small" sx={{ color: 'text.secondary', cursor: 'help' }} />
            </Tooltip>
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {AI_AGENT_TYPES.map((agent) => (
              <Card 
                key={agent.value}
                variant="outlined"
                sx={{
                  width: { xs: '100%', sm: '48%', md: '23%' },
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  border: selectedAgentType === agent.value ? '2px solid #5664d2' : '1px solid #e0e0e0',
                  '&:hover': { boxShadow: 2 }
                }}
                onClick={() => onAgentTypeChange(agent.value)}
              >
                <Box sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ mr: 1, color: selectedAgentType === agent.value ? 'primary.main' : 'text.secondary' }}>
                      {agent.icon}
                    </Box>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        fontWeight: selectedAgentType === agent.value ? 'bold' : 'normal',
                        color: selectedAgentType === agent.value ? 'primary.main' : 'inherit'
                      }}
                    >
                      {agent.label}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {agent.description}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Box>
        </Box>
        
        {/* Configuration options (always visible) */}
        <Box>
          {selectedAgentType && (
            <Box sx={{ p: 2, border: '1px dashed #d0d0d0', borderRadius: 1, mb: 2 }}>
              {selectedAgentType === 'extraction' && (
                <ExtractionFieldsConfig
                  fields={extractionFields || []}
                  onFieldsChange={onExtractionFieldsChange || (() => {})}
                  extractionSources={extractionSources}
                  onExtractionSourcesChange={onExtractionSourcesChange}
                  selectedEmails={selectedEmails}
                  onSelectedEmailsChange={onSelectedEmailsChange}
                />
              )}
              
              {selectedAgentType === 'classification' && (
                <ClassificationCategoriesConfig
                  categories={localClassificationCategories}
                  onCategoriesChange={setClassificationCategories}
                />
              )}
              
              {selectedAgentType === 'sentiment' && (
                <SentimentAnalysisConfig
                  sentimentThreshold={sentimentThreshold}
                  onSentimentThresholdChange={setSentimentThreshold}
                />
              )}
              
              {selectedAgentType === 'custom' && (
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 2 }}>
                    Custom AI Agent Configuration
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="AI Agent Instructions"
                    placeholder="Describe what you want the AI to do. E.g., 'Detect if this email contains a request for a refund and extract the order number and reason.'"
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                  />
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
    );
  };
  
  export default AIAgentBlock;