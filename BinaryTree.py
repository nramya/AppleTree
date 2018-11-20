class TreeNode:
    def __init__(self, data):
        self.data = data
        self.parent = None
        self.left_child = None
        self.right_child = None


class BinaryTree(TreeNode):

    def insert_left(self, node_data, parent):
        if not parent:
            raise Exception(400, 'Parent not found')
        parent.left = TreeNode(node_data)
        return parent.left

    def insert_right(self, node_data, parent):
        if not parent:
            raise Exception(400, 'Parent not found')
        parent.right = TreeNode(node_data)
        return parent.right
