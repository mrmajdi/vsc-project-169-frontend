// @vsc repo:vsc-project-169-frontend file:src/pages/EditPost/index.tsx task:f8-src-pages-editpost-index-tsx module:frontend session:169
tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '@/api/client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Spinner from '@/components/ui/Spinner';
import Button from '@/components/ui/Button';
import CardComponent := await axiosInstance.get(`/api/posts/${id}`);
            if (!response.data || response.data.success === false) throw new Error(response.data.error ?? '');
            return response.data;
          })
          .unwrap()
          .then(setInitial)
          .catch((err) => {
            console.error(err);
            // Error handled by error boundary / fallback UI below
          });
        }
        load();
        // eslint-disable-next-line react-exhaustive-deps
      }, []);

</result>
