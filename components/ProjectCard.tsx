"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import { ProjectInterface, UserProfile } from '@/common.types';

type Props = {
    project: ProjectInterface;
}

const ProjectCard = ({ project }: Props) => {
    const [randomLikes, setRandomLikes] = useState(0);
    const [randomViews, setRandomViews] = useState('');

    useEffect(() => {
        setRandomLikes(Math.floor(Math.random() * 50));
        setRandomViews(String((Math.floor(Math.random() * 10000) / 1000).toFixed(1) + 'k'));
    }, []);

    return (
        <div className="flexCenter flex-col rounded-2xl drop-shadow-card">
            <Link href={`/project/${project?.id}`} className="flexCenter group relative w-full h-full">
                <Image 
                    src={project?.image}
                    width={414}
                    height={314}
                    className="w-full h-full object-cover rounded-2xl"
                    alt="project image"
                />

                <div className="hidden group-hover:flex profile_card-title">
                    <p className="w-full">{project?.title}</p>
                </div>
            </Link>

            <div className="flexBetween w-full px-2 mt-3 font-semibold text-sm">
                <Link href={`/profile/${project?.createdBy?.id}`}>
                    <div className="flexCenter gap-2">
                        <Image
                            src={project?.createdBy?.avatarUrl}
                            width={24}
                            height={24}
                            className="rounded-full"
                            alt="profile image"
                        />
                        <p>{project?.createdBy?.name}</p>
                    </div>
                </Link>

                <div className="flexCenter gap-3">
                    <div className="flexCenter gap-2">
                        <Image src="/hearth.svg" width={13} height={12} alt="heart" />
                        <p className="text-sm">{randomLikes}</p>
                    </div>
                    <div className="flexCenter gap-2">
                        <Image src="/eye.svg" width={12} height={9} alt="eye" />
                        <p className="text-sm">{randomViews}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;