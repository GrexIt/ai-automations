import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

interface AIActionSelectorProps {
  onSelect: (actionType: string) => void;
}

const AIActionSelector: React.FC<AIActionSelectorProps> = ({ onSelect }) => {
  const [promptText, setPromptText] = useState('');
  const [modelType, setModelType] = useState('gpt-4');

  const aiActions = [
    {
      id: 'summarize',
      title: 'Summarize',
      description: 'Create a concise summary of the conversation'
    },
    {
      id: 'draft_response',
      title: 'Draft Response',
      description: 'Generate a response based on conversation context'
    },
    {
      id: 'categorize',
      title: 'Categorize',
      description: 'Analyze and categorize the conversation type'
    },
    {
      id: 'sentiment',
      title: 'Sentiment Analysis',
      description: 'Detect customer sentiment from conversation'
    },
    {
      id: 'custom_prompt',
      title: 'Custom Prompt',
      description: 'Create your own AI instruction'
    }
  ];

  return (
    <Box sx={{ mt: 1.5 }}>
      <Paper elevation={0} sx={{ p: 1.5, border: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <AutoAwesomeIcon sx={{ mr: 1, color: '#6366f1' }} />
          <Typography variant="h6">AI Action</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
          {aiActions.map((action) => (
            <Box 
              key={action.id} 
              sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(33.333% - 11px)' } }}
            >
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': { 
                    boxShadow: 3,
                    borderColor: 'primary.main',
                  },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }} 
                onClick={() => onSelect(action.id)}
                variant="outlined"
              >
                <CardContent>
                  <Typography variant="subtitle1" component="div" sx={{ fontWeight: 500 }}>
                    {action.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {action.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Example of an expanded AI action */}
      <Paper elevation={0} sx={{ p: 1.5, mt: 1.5, border: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AutoAwesomeIcon sx={{ mr: 1, color: '#6366f1' }} />
            <Typography variant="h6">Custom AI Prompt</Typography>
          </Box>
          <Box>
            <IconButton size="small">
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" color="error">
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ mb: 1.5 }}>
          <TextField
            fullWidth
            label="Prompt Instructions"
            multiline
            rows={4}
            placeholder="Enter detailed instructions for the AI. Example: Analyze this customer conversation and identify any product issues mentioned."
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
          />
        </Box>

        <Box sx={{ mb: 1.5 }}>
          <FormControl fullWidth>
            <InputLabel id="ai-model-label">AI Model</InputLabel>
            <Select
              labelId="ai-model-label"
              value={modelType}
              label="AI Model"
              onChange={(e) => setModelType(e.target.value as string)}
            >
              <MenuItem value="gpt-4">GPT-4 (Most capable, best for complex tasks)</MenuItem>
              <MenuItem value="gpt-3.5-turbo">GPT-3.5 (Faster, suitable for most tasks)</MenuItem>
              <MenuItem value="claude-3">Claude 3 (Best for long context analysis)</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary">
            Save Action
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AIActionSelector;
