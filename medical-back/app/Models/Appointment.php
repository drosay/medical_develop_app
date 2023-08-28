<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Specialty;

class Appointment extends Model
{
    use HasFactory;

    protected $table = 'appointment';

    public function doctor()
    {
        return $this->belongsTo(User::class, 'doctor_id');
    }
    
    public function patient()
    {
        return $this->belongsTo(User::class, 'patient_id');
    }

    public function specialty()
    {
        return $this->belongsTo(Specialty::class, 'specialty_id');
    }

}
