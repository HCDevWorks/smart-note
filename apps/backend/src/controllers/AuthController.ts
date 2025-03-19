import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Request, Response } from 'express';

export default class AuthController {
  private supabase: SupabaseClient;

  constructor(url: string, key: string) {
    this.supabase = createClient(url, key);
  }

  public async register(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(200).json({ message: 'User registered successfully', data });
  }

  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(200).json({ message: 'User logged in successfully', data });
  }
}
