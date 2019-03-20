<?php

namespace App\Http\Requests\Api;

use Dingo\Api\Http\FormRequest;

class ResetPasswordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email'    => 'required|email|max:180',
            'password' => 'required|string|confirmed|between:6,60',
            'token'    => 'required|string'
        ];
    }
}
