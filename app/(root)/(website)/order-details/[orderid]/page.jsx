import WebsiteBreadcrumb from '@/components/Application/Website/WebsiteBreadcrumb';
import axios from 'axios';
import Image from 'next/image';
import placeholderImg from '@/public/assets/images/img-placeholder.webp';
import Link from 'next/link';
import { WEBSITE_PRODUCT_DETAILS } from '@/routes/WebsiteRoute';

const OrderDetails = async ({ params }) => {
  const { orderid } = params;

  const { data: orderData } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/get/${orderid}`
  );

  const breadcrumb = {
    title: 'Order Details',
    links: [{ label: 'Order Details' }],
  };

  if (orderData && !orderData.success) {
    return (
      <>
        <WebsiteBreadcrumb props={breadcrumb} />
        <div className="flex justify-center items-center py-32">
          <h4 className="text-red-500 text-xl font-semibold">
            Order Not Found
          </h4>
        </div>
      </>
    );
  }

  const order = orderData?.data;

  return (
    <>
      <WebsiteBreadcrumb props={breadcrumb} />

      <div className="lg:px-32 px-5 my-16">
        {/* Order Info */}
        <div className="mb-6 space-y-1">
          <p>
            <b>Order ID:</b> {order?.order_id}
          </p>
          <p>
            <b>Transaction ID:</b> {order?.payment_id}
          </p>
          <p className="capitalize">
            <b>Status:</b>{' '}
            <span className="text-green-600 font-semibold">
              {order?.status}
            </span>
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT: Products */}
          <div className="lg:col-span-2 space-y-4">
            {order?.products?.map((product) => (
              <div
                key={product.variantId._id}
                className="flex gap-4 border rounded-lg p-4 bg-white shadow-sm"
              >
                <Image
                  src={
                    product?.variantId?.media?.[0]?.secure_url ||
                    placeholderImg.src
                  }
                  width={90}
                  height={120}
                  className="rounded object-cover"
                  alt="product"
                />

                <div className="flex-1">
                  <Link
                    href={WEBSITE_PRODUCT_DETAILS(product?.productId?.slug)}
                    className="font-medium hover:underline"
                  >
                    {product?.productId?.name}
                  </Link>

                  <p className="text-sm text-gray-500">
                    Color: {product?.variantId?.color} • Size:{' '}
                    {product?.variantId?.size}
                  </p>

                  <p className="text-sm text-gray-500">Qty: {product?.qty}</p>

                  <p className="mt-2 font-semibold">
                    {(product.qty * product.sellingPrice).toLocaleString(
                      'en-IN',
                      { style: 'currency', currency: 'INR' }
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Price Details */}
          <div className="border rounded-lg p-5 bg-white shadow-sm h-fit">
            <h4 className="font-semibold text-lg mb-4">Price Details</h4>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  {order?.subtotal.toLocaleString('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                  })}
                </span>
              </div>

              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>
                  -
                  {order?.discount.toLocaleString('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                  })}
                </span>
              </div>

              <div className="flex justify-between text-green-600">
                <span>Coupon Discount</span>
                <span>
                  -
                  {order?.couponDiscountAmount.toLocaleString('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                  })}
                </span>
              </div>

              <div className="border-t pt-3 flex justify-between font-semibold">
                <span>Total</span>
                <span>
                  {order?.totalAmount.toLocaleString('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                  })}
                </span>
              </div>
            </div>

            {/* Save Banner */}
            <div className="mt-4 bg-green-50 text-green-700 text-sm p-3 rounded">
              You saved{' '}
              <b>
                {(order?.discount + order?.couponDiscountAmount).toLocaleString(
                  'en-IN',
                  {
                    style: 'currency',
                    currency: 'INR',
                  }
                )}
              </b>{' '}
              on this order
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="mt-10 border rounded-lg p-5 bg-white">
          <h4 className="font-semibold text-lg mb-4">Shipping Address</h4>

          <p className="font-medium">{order?.name}</p>
          <p>{order?.email}</p>
          <p>{order?.phone}</p>
          <p>
            {order?.city}, {order?.state} – {order?.pincode}
          </p>
          <p>{order?.country}</p>
          <p className="text-gray-500">{order?.landmark || '—'}</p>
          <p className="text-gray-500 mt-1">{order?.ordernote || ''}</p>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
