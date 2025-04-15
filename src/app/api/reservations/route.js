// src/app/api/reservations/route.js
import Reservation from '@/models/Reservation';
import { connectMongoDB } from '../../../../lib/connect';

export async function POST(req) {
  await connectMongoDB();
  const reservationData = await req.json();

  try {
    // Explicitly set status to "pending" if it's not provided in reservationData
    const newReservation = new Reservation({
      ...reservationData,
      status: 'pending', // Ensure status is set to pending by default
    });

    await newReservation.save();
    return new Response(JSON.stringify({ message: 'Reservation successful!', reservation: newReservation }), { status: 201 });
  } catch (error) {
    console.error('Failed to save reservation:', error);
    return new Response(JSON.stringify({ error: 'Failed to book table' }), { status: 500 });
  }
}

export async function GET() {
    await connectMongoDB();
  
    try {
      const reservations = await Reservation.find(); // Fetch all reservations
      return new Response(JSON.stringify(reservations), { status: 200 });
    } catch (error) {
      console.error('Failed to fetch reservations:', error);
      return new Response(JSON.stringify({ error: 'Failed to fetch reservations' }), { status: 500 });
    }
  }
  export async function PATCH(req) {
    await connectMongoDB();
    const { reservationId, bookedStatus } = await req.json();
  
    try {
      const updatedReservation = await Reservation.findByIdAndUpdate(
        reservationId,
        { bookedStatus },
        { new: true } // Return the updated document
      );
  
      if (!updatedReservation) {
        return new Response(JSON.stringify({ error: 'Reservation not found' }), { status: 404 });
      }
  
      return new Response(JSON.stringify({ message: 'Reservation status updated!', updatedReservation }), { status: 200 });
    } catch (error) {
      console.error('Failed to update reservation status:', error);
      return new Response(JSON.stringify({ error: 'Failed to update status' }), { status: 500 });
    }
  }