import React from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

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
}

const ExtractionFieldsConfig: React.FC<ExtractionFieldsConfigProps> = ({
  fields,
  onFieldsChange,
  extractionSources = {
    subject: true,
    body: true,
    attachments: false
  },
  onExtractionSourcesChange
}) => {
  const handleSourceChange = (source: 'subject' | 'body' | 'attachments') => {
    if (onExtractionSourcesChange) {
      onExtractionSourcesChange({
        ...extractionSources,
        [source]: !extractionSources[source]
      });
    }
  };

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        Configure Extraction Fields
      </Typography>
      
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
          
          <TextField
            fullWidth
            size="small"
            label="Description"
            placeholder="e.g., Extract the full name of the customer"
            value={field.description}
            onChange={(e) => {
              const newFields = [...fields];
              newFields[index] = {...newFields[index], description: e.target.value};
              onFieldsChange(newFields);
            }}
            sx={{ mb: 2 }}
          />
          
          <TextField
            fullWidth
            size="small"
            label="Examples"
            placeholder="e.g., John Smith, Jane Doe, Robert Johnson"
            value={field.examples}
            onChange={(e) => {
              const newFields = [...fields];
              newFields[index] = {...newFields[index], examples: e.target.value};
              onFieldsChange(newFields);
            }}
          />
        </Box>
      ))}
      <Button 
        startIcon={<AddIcon />}
        onClick={() => onFieldsChange([...fields, {name: '', description: '', examples: ''}])}
      >
        Add Field
      </Button>
    </Box>
  );
};

export default ExtractionFieldsConfig;
