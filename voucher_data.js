const VOUCHERS = [
    {
        code: 'SALE30K',
        type: 'fixed',
        value: 30000,
        min_order: 0, 
        description: 'Giảm trực tiếp 30.000đ cho đơn hàng.'
    },
    {
        code: 'GIAM15',
        type: 'percentage', 
        value: 0.15, // 15%
        min_order: 500000, 
        description: 'Giảm 15% tối đa 100.000đ cho đơn hàng từ 500.000đ.'
    },
    {
        code: 'FREESHIP',
        type: 'fixed',
        value: 20000, // Giảm 20k
        min_order: 0,
        description: 'Giảm 20.000đ (thay thế cho miễn phí vận chuyển).'
    }
];