import 'package:flutter/material.dart';

void main() {
  runApp(const SmartMultiApp());
}

class SmartMultiApp extends StatelessWidget {
  const SmartMultiApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AI Health & RealLife English',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        primaryColor: Colors.tealAccent,
        scaffoldBackgroundColor: const Color(0密121212),
        colorScheme: const ColorScheme.dark(
          primary: Colors.tealAccent,
          secondary: Colors.cyanAccent,
        ),
      ),
      home: const MainDashboardScreen(),
    );
  }
}

// --- MAIN DASHBOARD SCREEN ---
class MainDashboardScreen extends StatelessWidget {
  const MainDashboardScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('AI Multi-Assistant', style: TextStyle(fontWeight: FontWeight.bold)),
        centerTitle: true,
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text(
              'Select a Section to Begin',
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.w500),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 40),
            
            // Section 1 Card
            _buildSectionCard(
              context,
              title: 'AI Health & Fitness',
              subtitle: 'Calorie Counter, Height Estimator & Hydration AI',
              icon: Icons.health_and_safety,
              color: Colors.tealAccent,
              onTap: () => Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const AIHealthSection()),
              ),
            ),
            const SizedBox(height: 20),
            
            // Section 2 Card
            _buildSectionCard(
              context,
              title: 'Real Life Learning',
              subtitle: 'Learn English from your daily environment & objects',
              icon: Icons.translate,
              color: Colors.cyanAccent,
              onTap: () => Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const RealLifeLearningSection()),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionCard(BuildContext context, 
      {required String title, required String subtitle, required IconData icon, required Color color, union, required VoidCallback onTap}) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(20),
      child: Container(
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [color.withOpacity(0.3), Colors.black54],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: color.withOpacity(0.5), width: 1.5),
        ),
        child: Row(
          children: [
            Icon(icon, size: 50, color: color),
            const SizedBox(width: 20),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: color)),
                  const SizedBox(height: 8),
                  Text(subtitle, style: const TextStyle(fontSize: 14, color: Colors.white70)),
                ],
              ),
            ),
            const Icon(Icons.arrow_forward_ios, color: Colors.white54),
          ],
        ),
      ),
    );
  }
}

// --- SECTION 1: AI HEALTH & FITNESS ---
class AIHealthSection extends StatelessWidget {
  const AIHealthSection({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('AI Health & Fitness'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context), // Back Button
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          _buildFeatureTile(
            title: 'AI Calorie Counter',
            description: 'Snap or upload a meal photo to calculate calories and nutrition facts instantly.',
            icon: Icons.fastfood,
            onPressed: () => _showActionMockDialog(context, 'Calorie Counter Camera/Upload Activated'),
          ),
          const SizedBox(height: 15),
          _buildFeatureTile(
            title: 'AI Height Estimator',
            description: 'Stand next to a wall, take a photo, and let AI estimate your height accurately.',
            icon: Icons.accessibility_new,
            onPressed: () => _showActionMockDialog(context, 'Height Estimator Camera Activated'),
          ),
          const SizedBox(height: 15),
          _buildFeatureTile(
            title: 'AI Smart Hydration (Bonus Feature)',
            description: 'Photograph your water bottle/glass to log your intake and track hydration levels.',
            icon: Icons.local_drink,
            onPressed: () => _showActionMockDialog(context, 'Hydration Tracker Camera Activated'),
          ),
        ],
      ),
    );
  }

  Widget _buildFeatureTile({required String title, required String description, required IconData icon, required VoidCallback onPressed}) {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
      color: const Color(0xFF1E1E1E),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(icon, color: Colors.tealAccent, size: 30),
                const SizedBox(width: 12),
                Text(title, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
              ],
            ),
            const SizedBox(height: 10),
            Text(description, style: const TextStyle(color: Colors.white70, fontSize: 14)),
            const SizedBox(height: 15),
            Align(
              alignment: Alignment.centerRight,
              child: ElevatedButton.icon(
                onPressed: onPressed,
                icon: const Icon(Icons.camera_alt),
                label: const Text('Analyze with AI'),
                style: ElevatedButton.styleFrom(backgroundColor: Colors.teal),
              ),
            )
          ],
        ),
      ),
    );
  }
}

// --- SECTION 2: REAL LIFE LEARNING ---
class RealLifeLearningSection extends StatefulWidget {
  const RealLifeLearningSection({Key? key}) : super(key: key);

  @override
  State<RealLifeLearningSection> createState() => _RealLifeLearningSectionState();
}

class _RealLifeLearningSectionState extends State<RealLifeLearningSection> {
  bool _languageSelected = false;
  String _nativeLanguage = 'Arabic';

  @override
  Widget build(BuildContext context) {
    // If first time, ask for native language selection
    if (!_languageSelected) {
      return Scaffold(
        appBar: AppBar(title: const Text('Setup Your Profile')),
        body: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Text(
                'Choose your Native Language',
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 10),
              const Text(
                'This will be used to translate English words and explain personalized lessons.',
                style: TextStyle(color: Colors.white60),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 30),
              DropdownButtonFormField<String>(
                value: _nativeLanguage,
                dropdownColor: const Color(0xFF1E1E1E),
                items: ['Arabic', 'French', 'Spanish', 'German', 'Hindi']
                    .map((lang) => DropdownMenuItem(value: lang, child: Text(lang)))
                    .toList(),
                onChanged: (val) {
                  setState(() {
                    _nativeLanguage = val!;
                  });
                },
                decoration: InputDecoration(
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                  filled: true,
                  fillColor: const Color(0xFF1E1E1E),
                ),
              ),
              const SizedBox(height: 40),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.cyanAccent,
                  foregroundColor: Colors.black,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                onPressed: () {
                  setState(() {
                    _languageSelected = true;
                  });
                },
                child: const Text('Start Personal Learning', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
              )
            ],
          ),
        ),
      );
    }

    // Main Real Life Learning Dashboard
    return Scaffold(
      appBar: AppBar(
        title: const Text('Real Life Learning'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context), // Back Button
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Daily Challenge Card
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: const LinearGradient(colors: [Colors.purple, Colors.cyan]),
                borderRadius: BorderRadius.circular(15),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Row(
                    children: [
                      Icon(Icons.star, color: Colors.yellow),
                      SizedBox(width: 8),
                      Text('DAILY REAL-LIFE MISSION', style: TextStyle(fontWeight: FontWeight.bold, letterSpacing: 1.2)),
                    ],
                  ),
                  const SizedBox(height: 12),
                  const Text(
                    '📸 Take a picture of something RED in your room, then record yourself describing it for 30 seconds.',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
                  ),
                  const SizedBox(height: 15),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      TextButton(
                        onPressed: () => _showActionMockDialog(context, 'Daily Challenge Submission Started'),
                        style: TextButton.styleFrom(backgroundColor: Colors.white24),
                        child: const Text('Accept Mission', style: TextStyle(color: Colors.white)),
                      )
                    ],
                  )
                ],
              ),
            ),
            const SizedBox(height: 25),

            // AI Action Buttons (Camera & Mic)
            Row(
              children: [
                Expanded(
                  child: _buildActionButton(
                    label: 'Camera Scan',
                    icon: Icons.camera_alt,
                    color: Colors.cyanAccent,
                    onTap: () => _showActionMockDialog(context, 'AI Vision Engine launched. Scan any real-world object!'),
                  ),
                ),
                const SizedBox(width: 15),
                Expanded(
                  child: _buildActionButton(
                    label: 'Voice Check',
                    icon: Icons.mic,
                    color: Colors.orangeAccent,
                    onTap: () => _showActionMockDialog(context, 'AI Listening active. Speak English to check pronunciation.'),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 25),

            // Interactive AI Chat Section Mock
            const Text('Dynamic AI Tutor Conversation', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 10),
            Container(
              height: 150,
              padding: const EdgeInsets.all(15),
              decoration: BoxDecoration(color: const Color(0xFF1E1E1E), borderRadius: BorderRadius.circular(15)),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      CircleAvatar(backgroundColor: Colors.cyanAccent.withOpacity(0.2), radius: 15, child: const Icon(Icons.psychology, size: 18, color: Colors.cyanAccent)),
                      const SizedBox(width: 10),
                      const Text('Personal AI Tutor', style: TextStyle(color: Colors.cyanAccent, fontWeight: FontWeight.bold)),
                    ],
                  ),
                  const Padding(
                    padding: EdgeInsets.only(left: 40, top: 8),
                    child: Text(
                      '“I noticed you like gaming! Based on the computer image you scanned earlier, let’s practice terms like GPU, Frame Rate, and Immersive. Can you tell me your favorite game?”',
                      style: TextStyle(fontStyle: FontStyle.italic, color: Colors.white80),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 25),

            // Progress and Review Section
            const Text('AI Memory & Vocabulary Review', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 10),
            ListTile(
              tileColor: const Color(0xFF1E1E1E),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              leading: const Icon(Icons.bookmark, color: Colors.cyanAccent),
              title: const Text('Reviewing: "Door" & "Window"'),
              subtitle: const Text('AI Prompt: "Describe the door in your room."'),
              trailing: const Icon(Icons.arrow_forward_ios, size: 16),
              onTap: () => _showActionMockDialog(context, 'Personal Review Session Started based on your AI history.'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildActionButton({required String label, required IconData icon, required Color color, union, required VoidCallback onTap}) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(15),
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 20),
        decoration: BoxDecoration(
          color: const Color(0xFF1E1E1E),
          borderRadius: BorderRadius.circular(15),
          border: Border.all(color: color.withOpacity(0.4)),
        ),
        child: Column(
          children: [
            Icon(icon, size: 36, color: color),
            const SizedBox(height: 10),
            Text(label, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
          ],
        ),
      ),
    );
  }
}

// Global Help Method for Mock Interactions
void _showActionMockDialog(BuildContext context, String message) {
  showDialog(
    context: context,
    builder: (context) => AlertDialog(
      title: const Row(
        children: [
          Icon(Icons.bolt, color: Colors.amber),
          SizedBox(width: 10),
          Text('AI Engine Active'),
        ],
      ),
      content: Text(message),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: const Text('OK', style: TextStyle(color: Colors.tealAccent)),
        )
      ],
    ),
  );
}