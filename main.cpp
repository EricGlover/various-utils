//
//  main.cpp
//  binaryTreesUtils
//
//  Created by Eric Glover on 3/23/17.
//  Copyright © 2017 Glover Corp. All rights reserved.
//
/*most of this is ripped from HackerRank Code */
#include <iostream>
#include <cstddef>

using namespace std;

class Node{
public:
    int data;
    Node *left;
    Node *right;
    Node(int d){
        data = d;
        left = NULL;
        right = NULL;
    }
};

class Solution {
public:
  		Node* insert(Node* root, int data) {
            if(root == NULL) {
                return new Node(data);
            }
            else {
                Node* cur;
                if(data <= root->data){
                    cur = insert(root->left, data);
                    root->left = cur;
                }
                else{
                    cur = insert(root->right, data);
                    root->right = cur;
                }
                
                return root;
            }
        }
    int height(Node* root) {
        if(root == NULL){
            return -1;
        }
        int left = height(root->left);
        int right = height(root->right);
        if(left >= right){
            return left + 1;
        }else{
            return right + 1;
        }
    }
}; //End of Solution

int main() {
    Solution myTree;
    Node* root = NULL;
    int t;
    int data;
    
    cin >> t;
    
    while(t-- > 0){
        cin >> data;
        root = myTree.insert(root, data);
    }
    int height = myTree.height(root);
    cout << height;
    
    return 0;
}
