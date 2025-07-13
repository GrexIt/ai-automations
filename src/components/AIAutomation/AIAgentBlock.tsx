import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  TextField,
  IconButton,
  Tooltip,
  Slider,
  Chip
} from '@mui/material';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import CategoryIcon from '@mui/icons-material/Category';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export interface AIAgentType {
  value: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

interface AIAgentBlockProps {
  onAgentTypeChange: (agentType: string) => void;
  selectedAgentType: string;
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
  selectedAgentType 
}) => {
  const [showAgentDetails, setShowAgentDetails] = useState(false);
  const [extractionFields, setExtractionFields] = useState(['']);
  const [classificationCategories, setClassificationCategories] = useState(['']);
  const [sentimentThreshold, setSentimentThreshold] = useState(0.5);
  const [customPrompt, setCustomPrompt] = useState('');

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
      
      {/* Configure AI Agent section - follows progressive disclosure */}
      <Box>
        <Button
          onClick={toggleAgentDetails}
          endIcon={showAgentDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          variant="text"
          color="primary"
          sx={{ mb: showAgentDetails ? 2 : 0 }}
        >
          {showAgentDetails ? 'Hide configuration' : 'Configure AI Agent'}
        </Button>
        
        {showAgentDetails && (
          <Box sx={{ p: 2, border: '1px dashed #d0d0d0', borderRadius: 1, mb: 2 }}>
            {selectedAgentType === 'extraction' && (
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                  Configure Extraction Fields
                </Typography>
                {extractionFields.map((field, index) => (
                  <Box key={index} sx={{ display: 'flex', mb: 2, gap: 1 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label={`Field ${index + 1}`}
                      placeholder="e.g., Customer Name, Order Number"
                      value={field}
                      onChange={(e) => {
                        const newFields = [...extractionFields];
                        newFields[index] = e.target.value;
                        setExtractionFields(newFields);
                      }}
                    />
                    {extractionFields.length > 1 && (
                      <IconButton 
                        color="error"
                        onClick={() => {
                          const newFields = extractionFields.filter((_, i) => i !== index);
                          setExtractionFields(newFields);
                        }}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    )}
                  </Box>
                ))}
                <Button 
                  startIcon={<AddIcon />}
                  onClick={() => setExtractionFields([...extractionFields, ''])}
                >
                  Add Field
                </Button>
              </Box>
            )}
            
            {selectedAgentType === 'classification' && (
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                  Configure Classification Categories
                </Typography>
                {classificationCategories.map((category, index) => (
                  <Box key={index} sx={{ display: 'flex', mb: 2, gap: 1 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label={`Category ${index + 1}`}
                      placeholder="e.g., Complaint, Inquiry, Feedback"
                      value={category}
                      onChange={(e) => {
                        const newCategories = [...classificationCategories];
                        newCategories[index] = e.target.value;
                        setClassificationCategories(newCategories);
                      }}
                    />
                    {classificationCategories.length > 1 && (
                      <IconButton 
                        color="error"
                        onClick={() => {
                          const newCategories = classificationCategories.filter((_, i) => i !== index);
                          setClassificationCategories(newCategories);
                        }}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    )}
                  </Box>
                ))}
                <Button 
                  startIcon={<AddIcon />}
                  onClick={() => setClassificationCategories([...classificationCategories, ''])}
                >
                  Add Category
                </Button>
              </Box>
            )}
            
            {selectedAgentType === 'sentiment' && (
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                  Configure Sentiment Analysis
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Set the threshold for determining positive or negative sentiment (0 = highly negative, 1 = highly positive)
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography>Threshold:</Typography>
                  <Box sx={{ flex: 1 }}>
                    <Slider
                      value={sentimentThreshold}
                      onChange={(_e: Event, value: number | number[]) => 
                        setSentimentThreshold(Array.isArray(value) ? value[0] : value)
                      }
                      step={0.05}
                      marks
                      min={0}
                      max={1}
                      valueLabelDisplay="auto"
                    />
                  </Box>
                  <Box sx={{ width: 80 }}>
                    <TextField
                      size="small"
                      type="number"
                      value={sentimentThreshold}
                      onChange={(e) => setSentimentThreshold(Number(e.target.value))}
                      inputProps={{ step: 0.05, min: 0, max: 1 }}
                    />
                  </Box>
                </Box>
                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                  <Chip 
                    label="Negative" 
                    color={sentimentThreshold >= 0.5 ? "default" : "error"} 
                    variant={sentimentThreshold >= 0.5 ? "outlined" : "filled"}
                  />
                  <Chip 
                    label="Neutral" 
                    color={Math.abs(sentimentThreshold - 0.5) <= 0.1 ? "primary" : "default"} 
                    variant={Math.abs(sentimentThreshold - 0.5) <= 0.1 ? "filled" : "outlined"}
                  />
                  <Chip 
                    label="Positive" 
                    color={sentimentThreshold < 0.5 ? "default" : "success"} 
                    variant={sentimentThreshold < 0.5 ? "outlined" : "filled"}
                  />
                </Box>
              </Box>
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
