import React, { useState } from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Avatar,
  Tabs,
  Tab,
  TextField,
  IconButton,
} from '@mui/material';
import {
  Forum as ForumIcon,
  People as PeopleIcon,
  Share as ShareIcon,
  School as SchoolIcon,
  ThumbUp as ThumbUpIcon,
  Comment as CommentIcon,
  Send as SendIcon,
  Person as PersonIcon,
  Agriculture as AgricultureIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const FarmerCommunityPage: React.FC = () => {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);
  const [newPost, setNewPost] = useState('');

  // Dummy community data
  const communityStats = {
    totalMembers: 15420,
    activePosts: 1247,
    expertAdvice: 89,
    successStories: 156,
  };

  const forumPosts = [
    {
      id: 1,
      author: 'Rajesh Kumar',
      title: 'Best practices for organic farming in dry regions',
      content: 'I have been practicing organic farming for 5 years in Rajasthan. Here are some techniques that have worked well for me...',
      likes: 24,
      comments: 8,
      time: '2 hours ago',
      category: 'Organic Farming',
      authorAvatar: 'R',
    },
    {
      id: 2,
      author: 'Priya Sharma',
      title: 'Crop rotation schedule for better yield',
      content: 'Can anyone share their crop rotation schedule? I am planning to rotate between wheat, rice, and pulses.',
      likes: 18,
      comments: 12,
      time: '4 hours ago',
      category: 'Crop Management',
      authorAvatar: 'P',
    },
    {
      id: 3,
      author: 'Amit Singh',
      title: 'Success story: Doubled my rice yield with new techniques',
      content: 'Last season I implemented SRI (System of Rice Intensification) method and saw amazing results. Yield increased from 3.5 to 7 tons per acre!',
      likes: 45,
      comments: 15,
      time: '1 day ago',
      category: 'Success Stories',
      authorAvatar: 'A',
    },
  ];

  const expertAdvice = [
    {
      id: 1,
      expert: 'Dr. Suresh Patel',
      title: 'Soil Health Management',
      description: 'Senior Agricultural Scientist with 20+ years experience',
      rating: 4.9,
      responses: 156,
      specialization: 'Soil Science',
    },
    {
      id: 2,
      expert: 'Dr. Meera Reddy',
      title: 'Crop Disease Management',
      description: 'Plant Pathologist specializing in crop diseases',
      rating: 4.8,
      responses: 89,
      specialization: 'Plant Pathology',
    },
    {
      id: 3,
      expert: 'Dr. Vikram Joshi',
      title: 'Water Management',
      description: 'Irrigation specialist and water conservation expert',
      rating: 4.7,
      responses: 67,
      specialization: 'Water Management',
    },
  ];

  const learningGroups = [
    {
      id: 1,
      name: 'Organic Farming Enthusiasts',
      members: 1250,
      description: 'Learn and share organic farming techniques',
      recentActivity: '2 hours ago',
    },
    {
      id: 2,
      name: 'Rice Cultivation Experts',
      members: 890,
      description: 'Advanced rice farming techniques and innovations',
      recentActivity: '5 hours ago',
    },
    {
      id: 3,
      name: 'Young Farmers Network',
      members: 2100,
      description: 'Supporting the next generation of farmers',
      recentActivity: '1 day ago',
    },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      // In a real app, this would submit to backend
      console.log('New post:', newPost);
      setNewPost('');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
          {t('farmer_community')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Connect with farmers worldwide and share knowledge and experiences
        </Typography>
      </Box>

      {/* Community Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PeopleIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Members</Typography>
              </Box>
              <Typography variant="h3" color="primary" fontWeight="bold">
                {communityStats.totalMembers.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active farmers
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ForumIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="h6">Active Posts</Typography>
              </Box>
              <Typography variant="h3" color="success.main" fontWeight="bold">
                {communityStats.activePosts}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SchoolIcon color="info" sx={{ mr: 1 }} />
                <Typography variant="h6">Expert Advice</Typography>
              </Box>
              <Typography variant="h3" color="info.main" fontWeight="bold">
                {communityStats.expertAdvice}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Available experts
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ShareIcon color="warning" sx={{ mr: 1 }} />
                <Typography variant="h6">Success Stories</Typography>
              </Box>
              <Typography variant="h3" color="warning.main" fontWeight="bold">
                {communityStats.successStories}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Shared this year
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
          <Tab label="Forum Posts" />
          <Tab label="Expert Advice" />
          <Tab label="Learning Groups" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      {tabValue === 0 && (
        <Box>
          {/* Create New Post */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Share Your Experience
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Share your farming experience, ask questions, or provide advice..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                />
                <IconButton 
                  color="primary" 
                  onClick={handlePostSubmit}
                  disabled={!newPost.trim()}
                >
                  <SendIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>

          {/* Forum Posts */}
          {forumPosts.map((post) => (
            <Card key={post.id} sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                    {post.authorAvatar}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      by {post.author} • {post.time}
                    </Typography>
                  </Box>
                  <Chip label={post.category} color="primary" size="small" />
                </Box>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {post.content}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Button size="small" startIcon={<ThumbUpIcon />}>
                    {post.likes}
                  </Button>
                  <Button size="small" startIcon={<CommentIcon />}>
                    {post.comments}
                  </Button>
                  <Button size="small" startIcon={<ShareIcon />}>
                    Share
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {tabValue === 1 && (
        <Grid container spacing={3}>
          {expertAdvice.map((expert) => (
            <Grid item xs={12} md={4} key={expert.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      <PersonIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        {expert.expert}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {expert.specialization}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                    {expert.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {expert.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="body2">
                      ⭐ {expert.rating} rating
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {expert.responses} responses
                    </Typography>
                  </Box>
                  <Button variant="contained" fullWidth>
                    Ask Question
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {tabValue === 2 && (
        <Grid container spacing={3}>
          {learningGroups.map((group) => (
            <Grid item xs={12} md={4} key={group.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                      <AgricultureIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        {group.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {group.members} members
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {group.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Last activity: {group.recentActivity}
                  </Typography>
                  <Button variant="outlined" fullWidth>
                    Join Group
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default FarmerCommunityPage;
