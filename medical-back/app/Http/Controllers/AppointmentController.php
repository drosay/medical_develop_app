<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointment;
use Validator;

class AppointmentController extends Controller
{
    //
    public function index()
    {
        $appointment = Appointment::all();
        return response()->json($appointment);
    }

    public function show(Appointment $appointment)
    {
        return response()->json($appointment);
    }

    public function store(Request $req)
    {

        $validator = Validator::make($req->all(), [
            'patient_id' => 'required|exists:users,id',
            'doctor_id' => 'required|exists:users,id',
            'specialty_id' => 'required|exists:specialty,id',
            'date' => 'required|date',
            'state' => 'required|string',
            'observation' => 'string|nullable',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $appointment = new Appointment;
        $appointment->patient_id = $req->patient_id;
        $appointment->doctor_id = $req->doctor_id;
        $appointment->specialty_id = $req->specialty_id;
        $appointment->date = $req->date;
        $appointment->state = $req->state;
        $appointment->observation = $req->observation;

        $appointment->save();

        return response()->json($appointment);

    }

    public function update(Request $req, Appointment $appointment)
    {
        $appointment->state = $req->state;

        $appointment->save();

        return response()->json($appointment);

    }

    public function destroy(Appointment $appointment)
    {
        $appointment->delete();
        return response()->json([
            'message' => 'Appointment deleted successfully'
        ]);

    }

    public function getAppointmentsByPatient($patient_id)
    {
        $appointments = Appointment::with(['doctor', 'specialty'])
            ->where('patient_id', $patient_id)
            ->get();
        return response()->json($appointments);
    }

    public function getAppointmentsByDoctor($doctor_id)
    {
        $appointments = Appointment::with(['patient', 'specialty'])
            ->where('doctor_id', $doctor_id)
            ->get();
        return response()->json($appointments);
    }
}