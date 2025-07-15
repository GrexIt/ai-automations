import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Alert,
  Drawer,
  Divider,
  Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EmailSelectionHelper, { Email } from './EmailSelectionHelper';

interface ExtractionField {
  name: string;
  description: string;
  examples: string;
}

interface ExtractionFieldsConfigProps {
  fields: ExtractionField[];
  onFieldsChange: (fields: ExtractionField[]) => void;
  extractionSources?: {
    subject: boolean;
    body: boolean;
    attachments: boolean;
  };
  onExtractionSourcesChange?: (sources: {subject: boolean, body: boolean, attachments: boolean}) => void;
  selectedEmails?: Email[];
  onSelectedEmailsChange?: (emails: Email[]) => void;
  drawerWidth?: number;
}

const ExtractionFieldsConfig: React.FC<ExtractionFieldsConfigProps> = ({
  fields,
  onFieldsChange,
  extractionSources = {
    subject: true,
    body: true,
    attachments: false
  },
  onExtractionSourcesChange,
  selectedEmails: externalSelectedEmails,
  onSelectedEmailsChange: externalOnSelectedEmailsChange,
  drawerWidth = 380
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  // Use internal state if external state handlers aren't provided
  const [internalSelectedEmails, setInternalSelectedEmails] = useState<Email[]>([]);
  
  // Use either external or internal state
  const selectedEmails = externalSelectedEmails || internalSelectedEmails;
  const onSelectedEmailsChange = externalOnSelectedEmailsChange || setInternalSelectedEmails;
  const handleSourceChange = (source: 'subject' | 'body' | 'attachments') => {
    if (onExtractionSourcesChange) {
      onExtractionSourcesChange({
        ...extractionSources,
        [source]: !extractionSources[source]
      });
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="subtitle2">
          Extraction Fields {fields.length > 0 && `(${fields.length})`}
        </Typography>
        <Button 
          variant="outlined" 
          size="small" 
          startIcon={<EditIcon />}
          onClick={toggleDrawer}
        >
          Configure
        </Button>
      </Box>
      
      {/* Show brief summary when drawer is closed */}
      {!drawerOpen && fields.length > 0 && (
        <Box sx={{ mb: 2 }}>
          {fields.map((field, index) => (
            <Chip 
              key={index}
              label={field.name || `Field ${index + 1}`}
              size="small"
              sx={{ mr: 1, mb: 1 }}
            />
          ))}
        </Box>
      )}
      
      {/* Drawer for configuration */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': { 
            width: drawerWidth,
            padding: 3,
            boxSizing: 'border-box'
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6">Configure Extraction Fields</Typography>
          <IconButton onClick={toggleDrawer} edge="end">
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
      
      {/* Source Checkboxes */}
      <Box sx={{ mb: 2, p: 1.5, bgcolor: '#f2f2f2', borderRadius: 1 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Extract from:
        </Typography>
        <FormGroup row>
          <FormControlLabel 
            control={
              <Checkbox 
                checked={extractionSources?.subject || false} 
                onChange={() => handleSourceChange('subject')}
                size="small"
              />
            } 
            label="Subject" 
          />
          <FormControlLabel 
            control={
              <Checkbox 
                checked={extractionSources?.body || false} 
                onChange={() => handleSourceChange('body')}
                size="small"
              />
            } 
            label="Body" 
          />
          <FormControlLabel 
            control={
              <Checkbox 
                checked={extractionSources?.attachments || false} 
                onChange={() => handleSourceChange('attachments')}
                size="small"
              />
            } 
            label="Attachments" 
          />
        </FormGroup>
      </Box>
      {fields.map((field, index) => (
        <Box key={index} sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="subtitle2">Field {index + 1}</Typography>
            {fields.length > 1 && (
              <IconButton 
                size="small"
                color="error"
                onClick={() => {
                  const newFields = fields.filter((_, i) => i !== index);
                  onFieldsChange(newFields);
                }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            )}
          </Box>
          
          <TextField
            fullWidth
            size="small"
            label="Field Name"
            placeholder="e.g., Customer Name, Order Number"
            value={field.name}
            onChange={(e) => {
              const newFields = [...fields];
              newFields[index] = {...newFields[index], name: e.target.value};
              onFieldsChange(newFields);
            }}
            sx={{ mb: 2 }}
          />
        </Box>
      ))}

      
      {/* Display warning if no fields are configured */}
      {fields.length === 0 && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Define at least one field to extract from emails.
        </Alert>
      )}

      
      {/* Email selection helper inside the drawer */}
      {fields.length > 0 && (
        <Box>
          <EmailSelectionHelper
            extractionFields={fields}
            selectedEmails={selectedEmails}
            onSelectedEmailsChange={onSelectedEmailsChange}
            minRequiredEmails={5}
          />
        </Box>
      )}
      <Divider sx={{ mb: 3 }} />
      <Button 
        startIcon={<AddIcon />}
        onClick={() => onFieldsChange([...fields, {name: '', description: '', examples: ''}])}
        sx={{ mb: 3 }}
      >
        Add Field
      </Button>
      </Drawer>
    </Box>
  );
};

export default ExtractionFieldsConfig;
