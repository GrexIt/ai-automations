import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider,
  Card
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const AIAutomationCreator: React.FC = () => {
  const [automationName, setAutomationName] = useState('');
  const [triggerType, setTriggerType] = useState('new_conversation');
  const [condition, setCondition] = useState('');

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 2, mb: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <IconButton sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5">Create new automation</Typography>
        </Box>

        {/* Automation Name */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Automation name</Typography>
          <TextField
            fullWidth
            placeholder="Automation name"
            value={automationName}
            onChange={(e) => setAutomationName(e.target.value)}
            InputProps={{
              endAdornment: (
                <Typography variant="body2" color="text.secondary">
                  {automationName.length}/100
                </Typography>
              ),
            }}
          />
        </Box>

        {/* When Section */}
        <Card variant="outlined" sx={{ mb: 3, p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <PlayArrowIcon color="primary" sx={{ mr: 2 }} />
            <Typography variant="subtitle1">When</Typography>
          </Box>
          
          <Box sx={{ pl: 5 }}>
            <FormControl fullWidth variant="outlined">
              <Select
                value={triggerType}
                onChange={(e) => setTriggerType(e.target.value)}
                displayEmpty
                renderValue={() => "New conversation (inbound) is received"}
                sx={{ 
                  '& .MuiSelect-select': { 
                    display: 'flex', 
                    alignItems: 'center' 
                  }
                }}
              >
                <MenuItem value="new_conversation">New conversation (inbound) is received</MenuItem>
                <MenuItem value="outbound_email">Outbound email is sent</MenuItem>
                <MenuItem value="tag_added">Tag is added</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Card>

        {/* If Section */}
        <Card variant="outlined" sx={{ mb: 3, p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <RadioButtonUncheckedIcon color="primary" sx={{ mr: 2 }} />
            <Typography variant="subtitle1">If</Typography>
          </Box>
          
          <Box 
            sx={{ 
              pl: 5, 
              backgroundColor: '#f5f8ff', 
              borderRadius: 1, 
              p: 2 
            }}
          >
            <FormControl fullWidth variant="outlined" sx={{ mb: 1 }}>
              <Select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                displayEmpty
                renderValue={() => "Select condition"}
                sx={{ backgroundColor: 'white' }}
              >
                <MenuItem value="subject_contains">Subject contains</MenuItem>
                <MenuItem value="from_email">From email</MenuItem>
                <MenuItem value="body_contains">Body contains</MenuItem>
                <MenuItem value="ai_detected">AI detected condition</MenuItem>
              </Select>
            </FormControl>
            
            <Button 
              startIcon={<AddIcon />} 
              sx={{ color: 'text.secondary' }}
            >
              OR condition
            </Button>
            
            <Box sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                sx={{ width: '100%', borderStyle: 'dashed' }}
              >
                + AND condition
              </Button>
            </Box>
          </Box>
        </Card>

        {/* Then Section */}
        <Card variant="outlined" sx={{ mb: 3, p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CheckCircleOutlineIcon color="primary" sx={{ mr: 2 }} />
            <Typography variant="subtitle1">Then</Typography>
          </Box>
          
          <Box sx={{ pl: 5 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '100px', 
              border: '2px dashed #ccc', 
              borderRadius: 1 
            }}>
              <Typography color="text.secondary">
                Add actions here
              </Typography>
            </Box>
          </Box>
        </Card>

        {/* Save Button */}
        <Box sx={{ mt: 4 }}>
          <Button 
            variant="contained" 
            color="primary"
            disabled={!automationName}
            sx={{ 
              textTransform: 'none', 
              backgroundColor: '#f0f4f9', 
              color: '#637381' 
            }}
          >
            Save and enable
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AIAutomationCreator;
