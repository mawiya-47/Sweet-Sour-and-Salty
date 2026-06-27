import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { toast } from 'sonner';
import { format } from 'date-fns';

const AdminDashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Biryani',
    price: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [items, orderRecords] = await Promise.all([
        pb.collection('menu_items').getFullList({ $autoCancel: false }),
        pb.collection('orders').getFullList({ sort: '-created', $autoCancel: false })
      ]);
      setMenuItems(items);
      setOrders(orderRecords);
    } catch (err) {
      toast.error('Failed to load data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        price: parseFloat(formData.price)
      };

      if (editingItem) {
        await pb.collection('menu_items').update(editingItem.id, data, { $autoCancel: false });
        toast.success('Menu item updated');
      } else {
        await pb.collection('menu_items').create(data, { $autoCancel: false });
        toast.success('Menu item created');
      }

      setDialogOpen(false);
      setEditingItem(null);
      setFormData({ name: '', category: 'Biryani', price: '', description: '', image: '' });
      fetchData();
    } catch (err) {
      toast.error('Failed to save item: ' + err.message);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      description: item.description || '',
      image: item.image || ''
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this menu item?')) return;

    try {
      await pb.collection('menu_items').delete(id, { $autoCancel: false });
      toast.success('Menu item deleted');
      fetchData();
    } catch (err) {
      toast.error('Failed to delete item: ' + err.message);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await pb.collection('orders').update(orderId, { status: newStatus }, { $autoCancel: false });
      toast.success('Order status updated');
      fetchData();
    } catch (err) {
      toast.error('Failed to update status: ' + err.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Sweet Sour and Salty</title>
        <meta name="description" content="Manage menu items and orders." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-balance" style={{ letterSpacing: '-0.02em' }}>
              Admin dashboard
            </h1>

            <Tabs defaultValue="menu" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
                <TabsTrigger value="menu">Menu management</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
              </TabsList>

              <TabsContent value="menu">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Menu items</CardTitle>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          onClick={() => {
                            setEditingItem(null);
                            setFormData({ name: '', category: 'Biryani', price: '', description: '', image: '' });
                          }}
                          className="transition-all duration-200 active:scale-[0.98]"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add item
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{editingItem ? 'Edit menu item' : 'Add menu item'}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="text-gray-900 placeholder:text-gray-400"
                            />
                          </div>
                          <div>
                            <Label htmlFor="category">Category</Label>
                            <Select name="category" value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Biryani">Biryani</SelectItem>
                                <SelectItem value="Pulao">Pulao</SelectItem>
                                <SelectItem value="Pizza">Pizza</SelectItem>
                                <SelectItem value="Burgers">Burgers</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="price">Price</Label>
                            <Input
                              id="price"
                              name="price"
                              type="number"
                              step="0.01"
                              value={formData.price}
                              onChange={handleChange}
                              required
                              className="text-gray-900 placeholder:text-gray-400"
                            />
                          </div>
                          <div>
                            <Label htmlFor="description">Description</Label>
                            <Input
                              id="description"
                              name="description"
                              value={formData.description}
                              onChange={handleChange}
                              className="text-gray-900 placeholder:text-gray-400"
                            />
                          </div>
                          <div>
                            <Label htmlFor="image">Image URL</Label>
                            <Input
                              id="image"
                              name="image"
                              type="url"
                              value={formData.image}
                              onChange={handleChange}
                              className="text-gray-900 placeholder:text-gray-400"
                            />
                          </div>
                          <Button type="submit" className="w-full transition-all duration-200 active:scale-[0.98]">
                            {editingItem ? 'Update item' : 'Create item'}
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                          <Skeleton key={i} className="h-16 w-full" />
                        ))}
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {menuItems.map(item => (
                            <TableRow key={item.id}>
                              <TableCell className="font-medium">{item.name}</TableCell>
                              <TableCell>{item.category}</TableCell>
                              <TableCell>${item.price.toFixed(2)}</TableCell>
                              <TableCell className="text-right">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEdit(item)}
                                  className="mr-2 transition-all duration-200"
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDelete(item.id)}
                                  className="text-destructive hover:text-destructive transition-all duration-200"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                          <Skeleton key={i} className="h-20 w-full" />
                        ))}
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orders.map(order => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">#{order.id.slice(0, 8)}</TableCell>
                              <TableCell>{order.customer_name}</TableCell>
                              <TableCell>{format(new Date(order.created), 'MMM dd, yyyy')}</TableCell>
                              <TableCell>${order.total_price.toFixed(2)}</TableCell>
                              <TableCell>
                                <Select
                                  value={order.status || 'Pending'}
                                  onValueChange={(value) => handleStatusChange(order.id, value)}
                                >
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="Confirmed">Confirmed</SelectItem>
                                    <SelectItem value="Preparing">Preparing</SelectItem>
                                    <SelectItem value="Ready">Ready</SelectItem>
                                    <SelectItem value="Delivered">Delivered</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AdminDashboard;