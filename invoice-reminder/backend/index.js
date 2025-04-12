const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();

app.post('/api/auth/google', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '227520277542-r860stfle6mg0d4age0qhq67gmat66rp.apps.googleusercontent.com', // 👈 Replace this!
    });
    const payload = ticket.getPayload();
    console.log('✅ Verified Google User:', payload);

    res.json({ message: 'User verified', user: payload });
  } catch (err) {
    console.error('❌ Verification failed:', err);
    res.status(401).json({ error: 'Invalid token' });
  }
});
