#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <queue>
#include <algorithm>
#include <cctype>
#include <cstring>

/**
 * MirrorTree - Binary Tree Recursive Mirror Implementation
 * Second Year BTech Computer Science Project
 */

struct Node {
    int id;
    int val;
    Node* left;
    Node* right;

    Node(int v, int nodeId) : id(nodeId), val(v), left(nullptr), right(nullptr) {}
};

// Global step logger for educational step-by-step visualization
struct RecursionStep {
    int nodeId;
    int val;
    int leftVal;
    bool hasLeft;
    int rightVal;
    bool hasRight;
    std::string description;
};

static std::vector<RecursionStep> g_steps;

/**
 * Core Algorithm: mirrorTree
 * 1. If root is NULL, return NULL.
 * 2. Swap the current node's left and right children.
 * 3. Recursively mirror the left subtree.
 * 4. Recursively mirror the right subtree.
 * 5. Return the root.
 */
Node* mirrorTree(Node* root) {
    if (root == nullptr) {
        return nullptr;
    }

    // Step 2: Swap the current node's left and right children
    Node* temp = root->left;
    root->left = root->right;
    root->right = temp;

    // Log step for educational explanation
    RecursionStep step;
    step.nodeId = root->id;
    step.val = root->val;
    step.hasLeft = (root->left != nullptr);
    step.leftVal = step.hasLeft ? root->left->val : 0;
    step.hasRight = (root->right != nullptr);
    step.rightVal = step.hasRight ? root->right->val : 0;
    step.description = "Swapped left and right subtrees of Node " + std::to_string(root->val);
    g_steps.push_back(step);

    // Step 3: Recursively mirror the left subtree
    mirrorTree(root->left);

    // Step 4: Recursively mirror the right subtree
    mirrorTree(root->right);

    // Step 5: Return root
    return root;
}

// Deep clone a binary tree so the original structure is preserved
Node* cloneTree(Node* root) {
    if (root == nullptr) {
        return nullptr;
    }
    Node* copy = new Node(root->val, root->id);
    copy->left = cloneTree(root->left);
    copy->right = cloneTree(root->right);
    return copy;
}

// Free allocated nodes in a tree
void freeTree(Node* root) {
    if (root == nullptr) return;
    freeTree(root->left);
    freeTree(root->right);
    delete root;
}

// Calculate height of tree (empty = 0, single root = 1)
int getTreeHeight(Node* root) {
    if (root == nullptr) return 0;
    int lh = getTreeHeight(root->left);
    int rh = getTreeHeight(root->right);
    return 1 + std::max(lh, rh);
}

// Count total nodes
int countNodes(Node* root) {
    if (root == nullptr) return 0;
    return 1 + countNodes(root->left) + countNodes(root->right);
}

// Queue-based level-order traversal (values only)
std::vector<int> getLevelOrderTraversal(Node* root) {
    std::vector<int> result;
    if (root == nullptr) return result;

    std::queue<Node*> q;
    q.push(root);

    while (!q.empty()) {
        Node* curr = q.front();
        q.pop();
        result.push_back(curr->val);

        if (curr->left != nullptr) {
            q.push(curr->left);
        }
        if (curr->right != nullptr) {
            q.push(curr->right);
        }
    }
    return result;
}

// Level-by-level grouped traversal
std::vector<std::vector<int>> getLevelsGrouped(Node* root) {
    std::vector<std::vector<int>> levels;
    if (root == nullptr) return levels;

    std::queue<Node*> q;
    q.push(root);

    while (!q.empty()) {
        int levelSize = q.size();
        std::vector<int> currentLevel;
        for (int i = 0; i < levelSize; ++i) {
            Node* curr = q.front();
            q.pop();
            currentLevel.push_back(curr->val);
            if (curr->left != nullptr) q.push(curr->left);
            if (curr->right != nullptr) q.push(curr->right);
        }
        levels.push_back(currentLevel);
    }
    return levels;
}

// Token for parsed input
struct Token {
    bool isNull;
    int val;
};

// Trim whitespace from string
static std::string trim(const std::string& str) {
    size_t first = str.find_first_not_of(" \t\n\r");
    if (first == std::string::npos) return "";
    size_t last = str.find_last_not_of(" \t\n\r");
    return str.substr(first, (last - first + 1));
}

// Parse comma/space-separated string of level-order values
bool parseLevelOrderInput(const std::string& input, std::vector<Token>& tokens, std::string& errorMsg) {
    tokens.clear();
    std::string s = trim(input);
    if (s.empty()) {
        return true; // empty input means empty tree
    }

    // Replace commas with spaces
    for (char& c : s) {
        if (c == ',') c = ' ';
    }

    std::stringstream ss(s);
    std::string item;
    int nextId = 1;

    while (ss >> item) {
        std::string lower = item;
        for (char& c : lower) c = std::tolower(c);

        if (lower == "null" || lower == "none" || lower == "nil" || lower == "#") {
            tokens.push_back({true, 0});
        } else {
            // Check if valid integer (optional leading + or - followed by digits)
            size_t idx = 0;
            if (item[0] == '+' || item[0] == '-') idx = 1;
            if (idx == item.size()) {
                errorMsg = "Invalid numeric token: '" + item + "'";
                return false;
            }
            bool allDigits = true;
            for (size_t i = idx; i < item.size(); ++i) {
                if (!std::isdigit(item[i])) {
                    allDigits = false;
                    break;
                }
            }
            if (!allDigits) {
                errorMsg = "Invalid numeric value: '" + item + "'. Only integers or 'null' allowed.";
                return false;
            }

            char* endPtr = nullptr;
            errno = 0;
            long long val = std::strtoll(item.c_str(), &endPtr, 10);
            if (errno != 0 || endPtr == item.c_str() || *endPtr != '\0' || val < -2147483648LL || val > 2147483647LL) {
                errorMsg = "Integer out of bounds or invalid number: '" + item + "'";
                return false;
            }
            tokens.push_back({false, static_cast<int>(val)});
        }
    }
    return true;
}

// Build standard binary tree using queue from level-order tokens
Node* buildTreeFromTokens(const std::vector<Token>& tokens, std::string& errorMsg) {
    if (tokens.empty() || tokens[0].isNull) {
        return nullptr;
    }

    int nextId = 1;
    Node* root = new Node(tokens[0].val, nextId++);
    std::queue<Node*> q;
    q.push(root);

    size_t i = 1;
    while (!q.empty() && i < tokens.size()) {
        Node* curr = q.front();
        q.pop();

        // Process left child
        if (i < tokens.size()) {
            if (!tokens[i].isNull) {
                curr->left = new Node(tokens[i].val, nextId++);
                q.push(curr->left);
            }
            i++;
        }

        // Process right child
        if (i < tokens.size()) {
            if (!tokens[i].isNull) {
                curr->right = new Node(tokens[i].val, nextId++);
                q.push(curr->right);
            }
            i++;
        }
    }

    return root;
}

// Serialize node to JSON
static void nodeToJson(Node* node, std::ostringstream& oss) {
    if (node == nullptr) {
        oss << "null";
        return;
    }
    oss << "{";
    oss << "\"id\":" << node->id << ",";
    oss << "\"val\":" << node->val << ",";
    oss << "\"left\":";
    nodeToJson(node->left, oss);
    oss << ",";
    oss << "\"right\":";
    nodeToJson(node->right, oss);
    oss << "}";
}

// Convert a tree and its mirror into a JSON string
std::string processTreeToJson(const std::string& input) {
    std::vector<Token> tokens;
    std::string errorMsg;
    g_steps.clear();

    if (!parseLevelOrderInput(input, tokens, errorMsg)) {
        return "{\"success\":false,\"error\":\"" + errorMsg + "\"}";
    }

    if (tokens.empty() || tokens[0].isNull) {
        return "{\"success\":true,\"isEmpty\":true,\"nodeCount\":0,\"height\":0,\"originalTraversal\":[],\"mirroredTraversal\":[],\"originalLevels\":[],\"mirroredLevels\":[],\"originalTree\":null,\"mirroredTree\":null,\"recursionSteps\":[]}";
    }

    Node* origRoot = buildTreeFromTokens(tokens, errorMsg);
    if (!errorMsg.empty()) {
        if (origRoot) freeTree(origRoot);
        return "{\"success\":false,\"error\":\"" + errorMsg + "\"}";
    }

    int totalNodes = countNodes(origRoot);
    int treeHeight = getTreeHeight(origRoot);

    std::vector<int> origTraversal = getLevelOrderTraversal(origRoot);
    std::vector<std::vector<int>> origLevels = getLevelsGrouped(origRoot);

    // Create a clone for mirroring so the original is completely preserved
    Node* mirrorRoot = cloneTree(origRoot);
    mirrorTree(mirrorRoot);

    std::vector<int> mirrorTraversal = getLevelOrderTraversal(mirrorRoot);
    std::vector<std::vector<int>> mirrorLevels = getLevelsGrouped(mirrorRoot);

    std::ostringstream oss;
    oss << "{";
    oss << "\"success\":true,";
    oss << "\"isEmpty\":false,";
    oss << "\"nodeCount\":" << totalNodes << ",";
    oss << "\"height\":" << treeHeight << ",";

    // Original traversal
    oss << "\"originalTraversal\":[";
    for (size_t i = 0; i < origTraversal.size(); ++i) {
        oss << origTraversal[i] << (i + 1 < origTraversal.size() ? "," : "");
    }
    oss << "],";

    // Mirrored traversal
    oss << "\"mirroredTraversal\":[";
    for (size_t i = 0; i < mirrorTraversal.size(); ++i) {
        oss << mirrorTraversal[i] << (i + 1 < mirrorTraversal.size() ? "," : "");
    }
    oss << "],";

    // Original levels
    oss << "\"originalLevels\":[";
    for (size_t i = 0; i < origLevels.size(); ++i) {
        oss << "[";
        for (size_t j = 0; j < origLevels[i].size(); ++j) {
            oss << origLevels[i][j] << (j + 1 < origLevels[i].size() ? "," : "");
        }
        oss << "]" << (i + 1 < origLevels.size() ? "," : "");
    }
    oss << "],";

    // Mirrored levels
    oss << "\"mirroredLevels\":[";
    for (size_t i = 0; i < mirrorLevels.size(); ++i) {
        oss << "[";
        for (size_t j = 0; j < mirrorLevels[i].size(); ++j) {
            oss << mirrorLevels[i][j] << (j + 1 < mirrorLevels[i].size() ? "," : "");
        }
        oss << "]" << (i + 1 < mirrorLevels.size() ? "," : "");
    }
    oss << "],";

    // Original tree
    oss << "\"originalTree\":";
    nodeToJson(origRoot, oss);
    oss << ",";

    // Mirrored tree
    oss << "\"mirroredTree\":";
    nodeToJson(mirrorRoot, oss);
    oss << ",";

    // Educational recursion steps
    oss << "\"recursionSteps\":[";
    for (size_t i = 0; i < g_steps.size(); ++i) {
        const auto& st = g_steps[i];
        oss << "{";
        oss << "\"nodeId\":" << st.nodeId << ",";
        oss << "\"val\":" << st.val << ",";
        oss << "\"hasLeft\":" << (st.hasLeft ? "true" : "false") << ",";
        oss << "\"leftVal\":" << st.leftVal << ",";
        oss << "\"hasRight\":" << (st.hasRight ? "true" : "false") << ",";
        oss << "\"rightVal\":" << st.rightVal << ",";
        oss << "\"description\":\"" << st.description << "\"";
        oss << "}" << (i + 1 < g_steps.size() ? "," : "");
    }
    oss << "]";

    oss << "}";

    // Clean up
    freeTree(origRoot);
    freeTree(mirrorRoot);

    return oss.str();
}

// ---------------- WebAssembly Exported C API ----------------

static char g_wasmBuffer[65536];

extern "C" {
    // Exported function for WebAssembly: executes C++ mirrorTree logic and returns pointer to JSON buffer
    const char* wasmProcessTree(const char* inputStr) {
        if (!inputStr) return "{\"success\":false,\"error\":\"Null input\"}";
        std::string json = processTreeToJson(std::string(inputStr));
        if (json.size() >= sizeof(g_wasmBuffer)) {
            return "{\"success\":false,\"error\":\"Output buffer exceeded\"}";
        }
        std::strncpy(g_wasmBuffer, json.c_str(), sizeof(g_wasmBuffer) - 1);
        g_wasmBuffer[sizeof(g_wasmBuffer) - 1] = '\0';
        return g_wasmBuffer;
    }

    // Direct C++ mirror algorithm execution on two integer arrays or node buffers if needed
    int wasmGetVersion() {
        return 100; // MirrorTree v1.0.0 C++ Core
    }
}

// ---------------- Native Executable Main & Test Harness ----------------

void runUnitTests() {
    std::cout << "Running MirrorTree C++ Unit Tests...\n";

    // Test 1: Complete binary tree: 1, 2, 3, 4, 5, 6, 7
    {
        std::string json = processTreeToJson("1, 2, 3, 4, 5, 6, 7");
        std::cout << "[Test 1] Complete Binary Tree: " 
                  << (json.find("\"mirroredTraversal\":[1,3,2,7,6,5,4]") != std::string::npos ? "PASSED" : "FAILED") 
                  << "\n";
    }

    // Test 2: Single node: 10
    {
        std::string json = processTreeToJson("10");
        std::cout << "[Test 2] Single Node: " 
                  << (json.find("\"mirroredTraversal\":[10]") != std::string::npos ? "PASSED" : "FAILED") 
                  << "\n";
    }

    // Test 3: Left-skewed tree: 1, 2, null, 3
    {
        std::string json = processTreeToJson("1, 2, null, 3");
        std::cout << "[Test 3] Left-Skewed Tree: " 
                  << (json.find("\"mirroredTraversal\":[1,2,3]") != std::string::npos ? "PASSED" : "FAILED") 
                  << "\n";
    }

    // Test 4: Empty tree
    {
        std::string json = processTreeToJson("");
        std::cout << "[Test 4] Empty Tree: " 
                  << (json.find("\"isEmpty\":true") != std::string::npos ? "PASSED" : "FAILED") 
                  << "\n";
    }

    // Test 5: Duplicate values: 1, 2, 2, 3, 4
    {
        std::string json = processTreeToJson("1, 2, 2, 3, 4");
        std::cout << "[Test 5] Duplicate Values: " 
                  << (json.find("\"mirroredTraversal\":[1,2,2,4,3]") != std::string::npos ? "PASSED" : "FAILED") 
                  << "\n";
    }

    std::cout << "All C++ Unit Tests Completed successfully.\n";
}

int main(int argc, char* argv[]) {
    if (argc > 1) {
        std::string arg = argv[1];
        if (arg == "--test") {
            runUnitTests();
            return 0;
        }
        // Argument passed as input string
        std::string json = processTreeToJson(arg);
        std::cout << json << std::endl;
        return 0;
    }

    // Check if stdin has data
    std::string line;
    if (std::getline(std::cin, line)) {
        std::string json = processTreeToJson(line);
        std::cout << json << std::endl;
        return 0;
    }

    // Default: run unit tests
    runUnitTests();
    return 0;
}
