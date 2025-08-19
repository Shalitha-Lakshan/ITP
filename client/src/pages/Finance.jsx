"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DollarSign, TrendingUp, TrendingDown, ShoppingCart, Truck, Factory, PieChart, BarChart3, Download, Calendar, ArrowUpRight, FileText, Printer, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Pie } from 'recharts';

import { generateFinancialPDF, generatePaymentsPDF, printComponent } from '@/lib/pdf-utils';
import { formatLKR, formatLKRCompact } from '@/lib/currency';
import { profitMargins, monthlyRevenue, expenseBreakdown, kpiData, recentTransactions } from '@/lib/data';
import withAuth from '@/components/auth/withAuth';

function FinancePage() {
	const [selectedPeriod, setSelectedPeriod] = useState('6months');
	const [selectedTab, setSelectedTab] = useState('overview');
	const [salesRecords, setSalesRecords] = useState(recentTransactions.filter((t) => t.type === 'sale'));
	const [paymentRecords, setPaymentRecords] = useState(recentTransactions.filter((t) => t.type !== 'sale'));
	const [isAddingSale, setIsAddingSale] = useState(false);
	const [isAddingPayment, setIsAddingPayment] = useState(false);
	const [editingRecord, setEditingRecord] = useState(null);

	const generateExcelReport = () => {
		const csvData = [
			['Month', 'Revenue', 'Expenses', 'Profit', 'Margin %'],
			...profitMargins.map((item) => [item.month, item.revenue, item.expenses, item.profit, item.margin]),
		];
		const csvContent = csvData.map((row) => row.join(',')).join('\n');
		const blob = new Blob([csvContent], { type: 'text/csv' });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `financial-data-${selectedPeriod}-${new Date().toISOString().split('T')[0]}.csv`;
		a.click();
		window.URL.revokeObjectURL(url);
	};

	const handleGenerateFinancialReport = () => {
		const pdf = generateFinancialPDF({ kpiData, profitMargins });
		pdf.save(`financial-report-${new Date().toISOString().split('T')[0]}.pdf`);
	};
	const generatePaymentsReport = () => {
		const pdf = generatePaymentsPDF(paymentRecords);
		pdf.save(`payments-report-${new Date().toISOString().split('T')[0]}.pdf`);
	};
	const printFinancialDashboard = () => {
		printComponent('financial-dashboard');
	};

	const getTransactionIcon = (type) => {
		switch (type) {
			case 'sale':
				return <ShoppingCart className="h-4 w-4" />;
			case 'manufacturing':
				return <Factory className="h-4 w-4" />;
			case 'expense':
				return <Truck className="h-4 w-4" />;
			default:
				return <DollarSign className="h-4 w-4" />;
		}
	};

	const addSaleRecord = (saleData) => {
		const newSale = {
			id: `TXN-${Date.now()}`,
			type: 'sale',
			description: saleData.description,
			amount: Number.parseFloat(saleData.amount),
			date: saleData.date,
			status: saleData.status,
		};
		setSalesRecords([newSale, ...salesRecords]);
		setIsAddingSale(false);
	};

	const addPaymentRecord = (paymentData) => {
		const newPayment = {
			id: `TXN-${Date.now()}`,
			type: paymentData.type,
			description: paymentData.description,
			amount: -Math.abs(Number.parseFloat(paymentData.amount)),
			date: paymentData.date,
			status: paymentData.status,
		};
		setPaymentRecords([newPayment, ...paymentRecords]);
		setIsAddingPayment(false);
	};

	const updateRecord = (updatedRecord) => {
		if (updatedRecord.type === 'sale') {
			setSalesRecords(salesRecords.map((r) => (r.id === updatedRecord.id ? updatedRecord : r)));
		} else {
			setPaymentRecords(paymentRecords.map((r) => (r.id === updatedRecord.id ? updatedRecord : r)));
		}
		setEditingRecord(null);
	};

	const deleteRecord = (recordId, type) => {
		if (type === 'sale') {
			setSalesRecords(salesRecords.filter((r) => r.id !== recordId));
		} else {
			setPaymentRecords(paymentRecords.filter((r) => r.id !== recordId));
		}
	};

	return (
		<div className="space-y-6" id="financial-dashboard">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold">Financial Dashboard</h1>
					<p className="mt-1">Comprehensive financial analytics and reporting</p>
				</div>
				<div className="flex items-center gap-3">
					<Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
						<SelectTrigger className="w-44">
							<Calendar className="h-4 w-4 mr-2" />
							<SelectValue placeholder="Last 6 Months" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="1month">Last Month</SelectItem>
							<SelectItem value="3months">Last 3 Months</SelectItem>
							<SelectItem value="6months">Last 6 Months</SelectItem>
							<SelectItem value="1year">Last Year</SelectItem>
						</SelectContent>
					</Select>
					<Button variant="outline" onClick={handleGenerateFinancialReport}>
						<FileText className="h-4 w-4 mr-2" />PDF Report
					</Button>
					<Button variant="outline" onClick={generateExcelReport}>
						<Download className="h-4 w-4 mr-2" />Excel Export
					</Button>
					<Button variant="outline" onClick={printFinancialDashboard}>
						<Printer className="h-4 w-4 mr-2" />Print
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<Card>
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm">Total Revenue</p>
								<p className="text-3xl font-bold">{formatLKRCompact(kpiData.totalRevenue)}</p>
							</div>
							<div className="p-3 rounded-full border">
								<DollarSign className="h-6 w-6" />
							</div>
						</div>
						<div className="flex items-center mt-3">
							<ArrowUpRight className="h-4 w-4" />
							<span className="text-sm ml-1 font-medium">+{kpiData.monthlyGrowth}% from last month</span>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm">Net Profit</p>
								<p className="text-3xl font-bold">{formatLKRCompact(kpiData.netProfit)}</p>
							</div>
							<div className="p-3 rounded-full border">
								<TrendingUp className="h-6 w-6" />
							</div>
						</div>
						<div className="flex items-center mt-3">
							<span className="text-sm">Profit Margin: </span>
							<span className="text-sm font-bold ml-1">{kpiData.profitMargin}%</span>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm">Bottles Processed</p>
								<p className="text-3xl font-bold">{kpiData.bottlesProcessed.toLocaleString()}</p>
							</div>
							<div className="p-3 rounded-full border">
								<Factory className="h-6 w-6" />
							</div>
						</div>
						<div className="flex items-center mt-3">
							<span className="text-sm">Revenue per bottle: </span>
							<span className="text-sm font-bold ml-1">{formatLKR(kpiData.revenuePerBottle)}</span>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm">Operating Costs</p>
								<p className="text-3xl font-bold">{formatLKRCompact(kpiData.totalExpenses)}</p>
							</div>
							<div className="p-3 rounded-full border">
								<TrendingDown className="h-6 w-6" />
							</div>
						</div>
						<div className="flex items-center mt-3">
							<span className="text-sm">Cost per bottle: </span>
							<span className="text-sm font-bold ml-1">{formatLKR(kpiData.operatingCosts)}</span>
						</div>
					</CardContent>
				</Card>
			</div>

			<Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
				<TabsList className="grid w-full grid-cols-5">
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="revenue">Revenue</TabsTrigger>
					<TabsTrigger value="expenses">Expenses</TabsTrigger>
					<TabsTrigger value="sales">Sales CRUD</TabsTrigger>
					<TabsTrigger value="payments">Payments CRUD</TabsTrigger>
				</TabsList>

				<TabsContent value="overview" className="mt-6">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center">
									<BarChart3 className="h-5 w-5 mr-2" />Revenue vs Profit
								</CardTitle>
							</CardHeader>
							<CardContent>
								<ResponsiveContainer width="100%" height={300}>
									<AreaChart data={profitMargins}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="month" />
										<YAxis tickFormatter={(value) => formatLKRCompact(value)} />
										<Tooltip formatter={(value) => [formatLKRCompact(value), '']} />
										<Area type="monotone" dataKey="revenue" stackId="1" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.6} />
										<Area type="monotone" dataKey="profit" stackId="2" stroke="#22c55e" fill="#22c55e" fillOpacity={0.8} />
									</AreaChart>
								</ResponsiveContainer>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center">
									<PieChart className="h-5 w-5 mr-2" />Expense Breakdown
								</CardTitle>
							</CardHeader>
							<CardContent>
								<ResponsiveContainer width="100%" height={300}>
									<RechartsPieChart>
										<Pie data={expenseBreakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
											{expenseBreakdown.map((entry, index) => (
												<Cell key={`cell-${index}`} fill={entry.color} />
											))}
										</Pie>
										<Tooltip formatter={(value) => [formatLKRCompact(value), '']} />
									</RechartsPieChart>
								</ResponsiveContainer>
								<div className="grid grid-cols-2 gap-2 mt-4">
									{expenseBreakdown.map((item, index) => (
										<div key={index} className="flex items-center gap-2">
											<div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
											<span className="text-xs">{item.name}</span>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="revenue" className="mt-6">
					<Card>
						<CardHeader>
							<CardTitle>Revenue Analytics</CardTitle>
						</CardHeader>
						<CardContent>
							<ResponsiveContainer width="100%" height={400}>
								<BarChart data={monthlyRevenue}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="month" />
									<YAxis tickFormatter={(value) => formatLKRCompact(value)} />
									<Tooltip formatter={(value) => [formatLKRCompact(value), '']} />
									<Bar dataKey="sales" fill="#22c55e" name="E-commerce Sales" />
									<Bar dataKey="manufacturing" fill="#60a5fa" name="Manufacturing Revenue" />
								</BarChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="expenses" className="mt-6">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						<Card>
							<CardHeader>
								<CardTitle>Monthly Expenses</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{expenseBreakdown.map((expense, index) => (
										<div key={index} className="flex items-center justify-between p-4 border rounded-lg">
											<div className="flex items-center gap-3">
												<div className="w-4 h-4 rounded-full" style={{ backgroundColor: expense.color }} />
												<span className="font-medium">{expense.name}</span>
											</div>
											<span className="font-semibold">{formatLKRCompact(expense.value)}</span>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Cost Optimization</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="p-4 border rounded-lg">
										<div className="flex items-center gap-2 mb-2">
											<TrendingDown className="h-4 w-4" />
											<span className="font-semibold">Cost Reduction Opportunity</span>
										</div>
										<p className="text-sm">Collection route optimization could reduce operational costs by 15%</p>
									</div>
									<div className="p-4 border rounded-lg">
										<div className="flex items-center gap-2 mb-2">
											<Factory className="h-4 w-4" />
											<span className="font-semibold">Manufacturing Efficiency</span>
										</div>
										<p className="text-sm">Processing capacity utilization at 78% - room for growth</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="sales" className="mt-6">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between">
							<CardTitle className="flex items-center">
								<ShoppingCart className="h-5 w-5 mr-2" />Sales Management
							</CardTitle>
							<div className="flex gap-2">
								<Dialog open={isAddingSale} onOpenChange={setIsAddingSale}>
									<DialogTrigger asChild>
										<Button>
											<Plus className="h-4 w-4 mr-2" />Add Sale
										</Button>
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>Add New Sale Record</DialogTitle>
										</DialogHeader>
										<SaleForm onSubmit={addSaleRecord} onCancel={() => setIsAddingSale(false)} />
									</DialogContent>
								</Dialog>
							</div>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{salesRecords.map((sale) => (
									<div key={sale.id} className="flex items-center justify-between p-4 border rounded-lg">
										<div className="flex items-center gap-4">
											<div className="p-2 rounded-full border">{getTransactionIcon(sale.type)}</div>
											<div>
												<div className="font-medium">{sale.description}</div>
												<div className="text-sm text-gray-500">
													{sale.id} • {new Date(sale.date).toLocaleDateString()}
												</div>
											</div>
										</div>
										<div className="flex items-center gap-2">
											<div className="text-right">
												<div className="font-semibold text-green-600">+{formatLKRCompact(sale.amount)}</div>
												<Badge variant={sale.status === 'completed' ? 'default' : 'secondary'}>{sale.status}</Badge>
											</div>
											<div className="flex gap-2">
												<Button size="sm" variant="outline" onClick={() => setEditingRecord(sale)}>
													<Edit className="h-4 w-4" />
												</Button>
												<Button size="sm" variant="outline" onClick={() => deleteRecord(sale.id, 'sale')}>
													<Trash2 className="h-4 w-4" />
												</Button>
											</div>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="payments" className="mt-6">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between">
							<CardTitle className="flex items-center">
								<DollarSign className="h-5 w-5 mr-2" />Payment Management
							</CardTitle>
							<div className="flex gap-2">
								<Button variant="outline" size="sm" onClick={generatePaymentsReport}>
									<FileText className="h-4 w-4 mr-2" />PDF Report
								</Button>
								<Dialog open={isAddingPayment} onOpenChange={setIsAddingPayment}>
									<DialogTrigger asChild>
										<Button variant="secondary">
											<Plus className="h-4 w-4 mr-2" />Add Payment
										</Button>
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>Add New Payment Record</DialogTitle>
										</DialogHeader>
										<PaymentForm onSubmit={addPaymentRecord} onCancel={() => setIsAddingPayment(false)} />
									</DialogContent>
								</Dialog>
							</div>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{paymentRecords.map((payment) => (
									<div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
										<div className="flex items-center gap-4">
											<div className="p-2 rounded-full border">{getTransactionIcon(payment.type)}</div>
											<div>
												<div className="font-medium">{payment.description}</div>
												<div className="text-sm text-gray-500">
													{payment.id} • {new Date(payment.date).toLocaleDateString()}
												</div>
											</div>
										</div>
										<div className="flex items-center gap-2">
											<div className="text-right">
												<div className="font-semibold text-red-600">-{formatLKRCompact(Math.abs(payment.amount))}</div>
												<Badge variant={payment.status === 'completed' ? 'default' : 'secondary'}>{payment.status}</Badge>
											</div>
											<div className="flex gap-2">
												<Button size="sm" variant="outline" onClick={() => setEditingRecord(payment)}>
													<Edit className="h-4 w-4" />
												</Button>
												<Button size="sm" variant="outline" onClick={() => deleteRecord(payment.id, payment.type)}>
													<Trash2 className="h-4 w-4" />
												</Button>
											</div>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>

			{editingRecord && (
				<Dialog open={!!editingRecord} onOpenChange={() => setEditingRecord(null)}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Edit {editingRecord.type === 'sale' ? 'Sale' : 'Payment'} Record</DialogTitle>
						</DialogHeader>
						{editingRecord.type === 'sale' ? (
							<SaleForm initialData={editingRecord} onSubmit={updateRecord} onCancel={() => setEditingRecord(null)} />
						) : (
							<PaymentForm initialData={editingRecord} onSubmit={updateRecord} onCancel={() => setEditingRecord(null)} />
						)}
					</DialogContent>
				</Dialog>
			)}
		</div>
	);
}

function SaleForm({ initialData, onSubmit, onCancel }) {
	const [formData, setFormData] = useState({
		description: initialData?.description || '',
		amount: initialData?.amount || '',
		date: initialData?.date || new Date().toISOString().split('T')[0],
		status: initialData?.status || 'completed',
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(initialData ? { ...initialData, ...formData } : formData);
	};
	return (
		<form onSubmit={handleSubmit} className="space-y-4 py-4">
			<div>
				<Label htmlFor="description">Description</Label>
				<Input id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Sale description" required />
			</div>
			<div>
				<Label htmlFor="amount">Amount (LKR)</Label>
				<Input id="amount" type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} placeholder="0.00" required />
			</div>
			<div>
				<Label htmlFor="date">Date</Label>
				<Input id="date" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
			</div>
			<div>
				<Label htmlFor="status">Status</Label>
				<Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
					<SelectTrigger>
						<SelectValue placeholder="Select Status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="completed">Completed</SelectItem>
						<SelectItem value="pending">Pending</SelectItem>
						<SelectItem value="cancelled">Cancelled</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className="flex justify-end gap-2 pt-4">
				<Button type="button" variant="ghost" onClick={onCancel}>
					<X className="h-4 w-4 mr-2" />Cancel
				</Button>
				<Button type="submit">
					<Save className="h-4 w-4 mr-2" />
					{initialData ? 'Update' : 'Create'} Sale
				</Button>
			</div>
		</form>
	);
}

function PaymentForm({ initialData, onSubmit, onCancel }) {
	const [formData, setFormData] = useState({
		type: initialData?.type || 'expense',
		description: initialData?.description || '',
		amount: initialData?.amount ? Math.abs(initialData.amount) : '',
		date: initialData?.date || new Date().toISOString().split('T')[0],
		status: initialData?.status || 'completed',
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(initialData ? { ...initialData, ...formData } : formData);
	};
	return (
		<form onSubmit={handleSubmit} className="space-y-4 py-4">
			<div>
				<Label htmlFor="type">Payment Type</Label>
				<Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
					<SelectTrigger>
						<SelectValue placeholder="Select Type" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="expense">Expense</SelectItem>
						<SelectItem value="manufacturing">Manufacturing Cost</SelectItem>
						<SelectItem value="salary">Salary Payment</SelectItem>
						<SelectItem value="maintenance">Maintenance</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div>
				<Label htmlFor="description">Description</Label>
				<Input id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Payment description" required />
			</div>
			<div>
				<Label htmlFor="amount">Amount (LKR)</Label>
				<Input id="amount" type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} placeholder="0.00" required />
			</div>
			<div>
				<Label htmlFor="date">Date</Label>
				<Input id="date" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
			</div>
			<div>
				<Label htmlFor="status">Status</Label>
				<Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
					<SelectTrigger>
						<SelectValue placeholder="Select Status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="completed">Completed</SelectItem>
						<SelectItem value="pending">Pending</SelectItem>
						<SelectItem value="cancelled">Cancelled</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className="flex justify-end gap-2 pt-4">
				<Button type="button" variant="ghost" onClick={onCancel}>
					<X className="h-4 w-4 mr-2" />Cancel
				</Button>
				<Button type="submit" variant="secondary">
					<Save className="h-4 w-4 mr-2" />
					{initialData ? 'Update' : 'Create'} Payment
				</Button>
			</div>
		</form>
	);
}

export default withAuth(FinancePage);