create extension if not exists pgcrypto;

create table if not exists public.departures (
  id uuid primary key default gen_random_uuid(),
  route_id uuid not null references public.routes(id) on delete cascade,
  ferry_operator text not null check (ferry_operator in ('Phú Quốc Express', 'Superdong')),
  departure_time text not null,
  price_label text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.departures (id, route_id, ferry_operator, departure_time, price_label)
values
  ('9d400f3d-f7a3-4f29-92d8-0d4c6dc6f4a6', '6e453953-8d5f-489b-b596-8a0c8f1a1e1f', 'Superdong', '07:20', 'Người lớn: 324.000 VND; NCT: 275.000 VND; Trẻ em: 236.000 VND'),
  ('ebade7c5-0a51-4836-90aa-6d1f446d8fa3', '6e453953-8d5f-489b-b596-8a0c8f1a1e1f', 'Superdong', '10:10', 'Người lớn: 324.000 VND; NCT: 275.000 VND; Trẻ em: 236.000 VND'),
  ('84f48d9a-2b4b-43c5-a5f3-e0f4d2414913', '6e453953-8d5f-489b-b596-8a0c8f1a1e1f', 'Superdong', '12:20', 'Người lớn: 324.000 VND; NCT: 275.000 VND; Trẻ em: 236.000 VND'),
  ('ba9ad02d-bdb2-4c3c-8935-6cc5b19198f8', '6e453953-8d5f-489b-b596-8a0c8f1a1e1f', 'Superdong', '13:30', 'Người lớn: 324.000 VND; NCT: 275.000 VND; Trẻ em: 236.000 VND'),
  ('f08fe4d8-c71d-4f37-b7ab-7e7486f3c68b', '6e453953-8d5f-489b-b596-8a0c8f1a1e1f', 'Phú Quốc Express', '07:10', 'VIP: 500.000 VND; Người lớn: 315.000 VND; NCT: 265.000 VND; Trẻ em: 225.000 VND'),
  ('866c22cb-9c47-48cd-9b41-1f672b4a96ac', '6e453953-8d5f-489b-b596-8a0c8f1a1e1f', 'Phú Quốc Express', '08:00', 'VIP: 500.000 VND; Người lớn: 315.000 VND; NCT: 265.000 VND; Trẻ em: 225.000 VND'),
  ('76f4c416-1db4-4a6d-8a5f-f3d8149d6d3c', '6e453953-8d5f-489b-b596-8a0c8f1a1e1f', 'Phú Quốc Express', '10:00', 'VIP: 500.000 VND; Người lớn: 315.000 VND; NCT: 265.000 VND; Trẻ em: 225.000 VND'),
  ('6d1b22d5-6cf4-4bf0-9d91-2d7a67d154f5', '6e453953-8d5f-489b-b596-8a0c8f1a1e1f', 'Phú Quốc Express', '13:20', 'VIP: 500.000 VND; Người lớn: 315.000 VND; NCT: 265.000 VND; Trẻ em: 225.000 VND'),
  ('a5c99740-fbb2-4864-b195-1f2c230b9530', '6e453953-8d5f-489b-b596-8a0c8f1a1e1f', 'Superdong', '07:10', 'Người lớn: 324.000 VND; NCT: 275.000 VND; Trẻ em: 236.000 VND'),
  ('d5146a7f-b2dd-46f2-ac91-93ef1d171eb0', '6e453953-8d5f-489b-b596-8a0c8f1a1e1f', 'Superdong', '07:55', 'Người lớn: 324.000 VND; NCT: 275.000 VND; Trẻ em: 236.000 VND'),
  ('e9bf6d03-5ef6-4cf1-8341-716d0d9654ee', '6e453953-8d5f-489b-b596-8a0c8f1a1e1f', 'Superdong', '10:30', 'Người lớn: 324.000 VND; NCT: 275.000 VND; Trẻ em: 236.000 VND'),
  ('46f474f8-f5d9-44b8-b1e7-62c817b6c9f5', '6e453953-8d5f-489b-b596-8a0c8f1a1e1f', 'Superdong', '13:10', 'Người lớn: 324.000 VND; NCT: 275.000 VND; Trẻ em: 236.000 VND')
on conflict (id) do nothing;
