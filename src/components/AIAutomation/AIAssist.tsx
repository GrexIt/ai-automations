import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  TextField, 
  Button, 
  Card,
  Chip,
} from '@mui/material';

// Material UI Icons
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

interface AIAssistProps {
  compactInputStyles?: React.CSSProperties | any;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIAssist: React.FC<AIAssistProps> = ({ compactInputStyles = {} }) => {
  // Common automation suggestions
  const commonAutomations = [
    { label: 'Auto-categorize emails', value: 'Create automation to auto-categorize incoming emails based on content' },
    { label: 'Auto-assign to team members', value: 'Build automation to assign conversations to specific team members' },
    { label: 'Send welcome emails', value: 'Set up automation to send personalized welcome emails to new customers' },
    { label: 'Tag urgent conversations', value: 'Create automation to identify and tag urgent support requests' },
    { label: 'Auto-respond to FAQs', value: 'Build automation to detect and auto-respond to common questions' },
  ];

  // State for the AI Assist component
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  // Send message handler
  const handleSendMessage = (contentOrEvent?: React.MouseEvent | string) => {
    // If it's a string, use it directly
    let messageContent = typeof contentOrEvent === 'string' ? contentOrEvent : inputValue;
    
    if (messageContent.trim() === '') return;
    
    // Add user message
    setMessages([...messages, { role: 'user', content: messageContent }]);
    
    // In a real application, this would call an API to get the assistant's response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `I can help you with that. What specific part of the automation would you like assistance with?` 
      }]);
    }, 1000);
    
    setInputValue('');
  };
  
  // Handle suggestion chip click
  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <>
      {/* AI Assist Chat - Hidden by default */}
      <Card variant="outlined" sx={{ position: 'sticky', top: 16, mt: 2, display: isVisible ? 'block' : 'none' }}>
        {/* AI Assist Header */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center', 
            p: 2,
            backgroundColor: '#f9fafc'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ 
              display: 'inline-flex',
              borderRadius: '50%',
              backgroundColor: '#f0f4ff',
              p: 1,
              mr: 1
            }}>
              <AutoAwesomeIcon color="primary" fontSize="small" />
            </Box>
            <Typography variant="h6">AI Assist</Typography>
          </Box>
          <IconButton size="small" onClick={() => setIsVisible(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        
        {/* Chat Messages Container */}
        <Box sx={{ p: 2, pt: 0, height: '250px', overflowY: 'auto' }}>
          {messages.length === 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <AutoAwesomeIcon color="disabled" sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
                Common automations you can create:
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
                {commonAutomations.map((suggestion, index) => (
                  <Chip
                    key={index}
                    label={suggestion.label}
                    onClick={() => handleSuggestionClick(suggestion.value)}
                    color="primary"
                    variant="outlined"
                    clickable
                    sx={{ borderRadius: 1, mb: 0.5 }}
                  />
                ))}
              </Box>
            </Box>
          ) : (
            messages.map((msg, index) => (
              <Box 
                key={index} 
                sx={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  mb: 1
                }}
              >
                <Box sx={{
                  maxWidth: '80%',
                  p: 1.5,
                  borderRadius: 2,
                  backgroundColor: msg.role === 'user' ? '#e3f2fd' : '#f5f5f5',
                }}>
                  <Typography variant="body2">{msg.content}</Typography>
                </Box>
              </Box>
            ))
          )}
        </Box>
        
        {/* Chat Input */}
        <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              fullWidth
              placeholder="Ask AI for help with your automation..."
              size="small"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              sx={compactInputStyles}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            <IconButton 
              color="primary" 
              sx={{ ml: 1 }}
              disabled={inputValue.trim() === ''}
              onClick={handleSendMessage}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Card>

      {/* Toggle AI Assist button */}
      <Box sx={{ display: isVisible ? 'none' : 'flex', justifyContent: 'center', mt: 2 }}>
        <Button
          variant="outlined"
          startIcon={<AutoAwesomeIcon />}
          onClick={() => setIsVisible(true)}
          sx={{ borderRadius: 4 }}
        >
          AI Assist
        </Button>
      </Box>
    </>
  );
};

export default AIAssist;
