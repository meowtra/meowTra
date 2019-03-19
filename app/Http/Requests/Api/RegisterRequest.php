<?php

namespace App\Http\Requests\Api;

use Dingo\Api\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'email'    => 'required|email|max:180|unique:users',
            'nickname' => 'required|string|max:30',
            'password' => 'required|string|between:6,60',
            'token'    => 'required|string',
        ];
    }
}
