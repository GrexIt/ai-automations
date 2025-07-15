import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Chip,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

export interface Email {
  id: string;
  subject: string;
  from: string;
  date: string;
  selected: boolean;
}

interface EmailSelectionHelperProps {
  extractionFields: Array<{
    name: string;
    description: string;
    examples: string;
  }>;
  selectedEmails: Email[];
  onSelectedEmailsChange: (emails: Email[]) => void;
  minRequiredEmails?: number;
}

const EmailSelectionHelper: React.FC<EmailSelectionHelperProps> = ({
  extractionFields,
  selectedEmails,
  onSelectedEmailsChange,
  minRequiredEmails = 5
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Email[]>([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = () => {
    // In a real implementation, this would call an API to search emails
    setIsSearching(true);
    
    // Mock search results - this would be replaced with actual API call
    setTimeout(() => {
      const mockResults: Email[] = [
        { id: '1', subject: 'Order #12345 confirmation', from: 'store@example.com', date: '2025-07-10', selected: false },
        { id: '2', subject: 'Your order has shipped', from: 'shipping@example.com', date: '2025-07-11', selected: false },
        { id: '3', subject: 'Invoice for your recent purchase', from: 'billing@example.com', date: '2025-07-12', selected: false },
        { id: '4', subject: 'Customer feedback requested', from: 'feedback@example.com', date: '2025-07-13', selected: false },
        { id: '5', subject: 'Order status update', from: 'support@example.com', date: '2025-07-14', selected: false },
        { id: '6', subject: 'Receipt for order #54321', from: 'receipts@example.com', date: '2025-07-15', selected: false },
      ];
      
      // Mark emails that are already selected
      const updatedResults = mockResults.map(email => ({
        ...email,
        selected: selectedEmails.some(selected => selected.id === email.id)
      }));
      
      setSearchResults(updatedResults);
      setIsSearching(false);
    }, 1000);
  };

  const handleSelectEmail = (emailId: string) => {
    const updatedResults = searchResults.map(email => 
      email.id === emailId ? { ...email, selected: !email.selected } : email
    );
    setSearchResults(updatedResults);
    
    const newSelectedEmails = updatedResults.filter(email => email.selected);
    onSelectedEmailsChange(newSelectedEmails);
  };

  const handleSelectAll = () => {
    const allSelected = searchResults.every(email => email.selected);
    const updatedResults = searchResults.map(email => ({ ...email, selected: !allSelected }));
    setSearchResults(updatedResults);
    
    const newSelectedEmails = updatedResults.filter(email => email.selected);
    onSelectedEmailsChange(newSelectedEmails);
  };

  const hasEnoughEmails = selectedEmails.length >= minRequiredEmails;
  
  // Suggest search queries based on extraction fields
  const getSuggestedSearchQueries = () => {
    return extractionFields.map(field => {
      // Extract first example if available
      const example = field.examples ? field.examples.split(',')[0].trim() : '';
      return {
        field: field.name,
        query: example || field.name
      };
    });
  };

  const suggestedQueries = getSuggestedSearchQueries();

  return (
    <Box sx={{ mt: 2, border: '1px solid #e0e0e0', borderRadius: 1, p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mr: 1 }}>
            Email Selection
          </Typography>
          {hasEnoughEmails ? (
            <Chip 
              icon={<CheckCircleIcon />} 
              label={`${selectedEmails.length} emails selected`} 
              color="success" 
              size="small"
            />
          ) : (
            <Chip 
              icon={<ErrorIcon />} 
              label={`${selectedEmails.length}/${minRequiredEmails} emails required`} 
              color="warning" 
              size="small"
            />
          )}
        </Box>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          startIcon={<SearchIcon />}
          onClick={handleOpen}
        >
          Search for Emails
        </Button>
      </Box>
      
      {!hasEnoughEmails && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          You need at least {minRequiredEmails} emails containing the extraction fields for accurate AI analysis.
        </Alert>
      )}
      
      {selectedEmails.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Selected Emails:</Typography>
          <List dense>
            {selectedEmails.slice(0, 3).map(email => (
              <ListItem key={email.id} sx={{ p: 0.5, bgcolor: '#f5f5f5', mb: 0.5, borderRadius: 1 }}>
                <EmailIcon sx={{ mr: 1, fontSize: '0.9rem', color: '#666' }} />
                <ListItemText 
                  primary={email.subject} 
                  secondary={email.from}
                  primaryTypographyProps={{ variant: 'body2' }}
                  secondaryTypographyProps={{ variant: 'caption' }}
                />
              </ListItem>
            ))}
            {selectedEmails.length > 3 && (
              <Typography variant="caption" sx={{ display: 'block', pl: 1 }}>
                +{selectedEmails.length - 3} more emails selected
              </Typography>
            )}
          </List>
        </Box>
      )}
      
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Search for Emails with Extraction Fields
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Search for emails that contain the data you want to extract. The AI model needs at least {minRequiredEmails} examples to learn from.
            </Typography>
            
            {suggestedQueries.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Suggested searches:</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 0.5 }}>
                  {suggestedQueries.map((suggestion, index) => (
                    <Chip 
                      key={index}
                      label={suggestion.query} 
                      size="small" 
                      onClick={() => setSearchQuery(suggestion.query)}
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>
            )}
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                placeholder="Search emails by keyword, subject, or sender"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                variant="contained" 
                startIcon={isSearching ? <CircularProgress size={16} color="inherit" /> : <SearchIcon />}
                onClick={handleSearch}
                disabled={isSearching || searchQuery.trim().length === 0}
              >
                Search
              </Button>
            </Box>
          </Box>
          
          {searchResults.length > 0 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2">Search Results:</Typography>
                <Button 
                  size="small" 
                  onClick={handleSelectAll}
                >
                  {searchResults.every(email => email.selected) ? 'Deselect All' : 'Select All'}
                </Button>
              </Box>
              <List sx={{ maxHeight: 400, overflow: 'auto', bgcolor: '#f5f5f5', borderRadius: 1 }}>
                {searchResults.map(email => (
                  <ListItem 
                    key={email.id}
                    dense
                    onClick={() => handleSelectEmail(email.id)}
                    sx={{ 
                      mb: 0.5, 
                      bgcolor: email.selected ? '#e3f2fd' : 'white',
                      borderRadius: 1,
                      cursor: 'pointer'
                    }}
                  >
                    <Checkbox 
                      edge="start"
                      checked={email.selected}
                      tabIndex={-1}
                      disableRipple
                      size="small"
                    />
                    <ListItemText
                      primary={email.subject}
                      secondary={`${email.from} · ${email.date}`}
                      primaryTypographyProps={{ variant: 'body2' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
          
          {isSearching && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress size={40} />
            </Box>
          )}
          
          {!isSearching && searchResults.length === 0 && searchQuery && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4, flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ mb: 1, color: '#666' }}>No emails found matching "{searchQuery}"</Typography>
              <Typography variant="body2" color="text.secondary">Try different search terms or check your inbox</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Typography variant="body2" sx={{ mr: 'auto', ml: 2, color: selectedEmails.length >= minRequiredEmails ? 'success.main' : 'warning.main' }}>
            {selectedEmails.length}/{minRequiredEmails} emails selected
          </Typography>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            variant="contained"
            onClick={handleClose}
            disabled={selectedEmails.length < minRequiredEmails}
          >
            Confirm Selection
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmailSelectionHelper;
