import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  CheckCircle,
  Link as LinkIcon,
  Smartphone,
  BarChart3,
  Users,
} from 'lucide-react'

const icons = {
  site: CheckCircle,
  api: LinkIcon,
  mobile: Smartphone,
  data: BarChart3,
  clients: Users,
}

export default function AnimatedServiceCard({
  title,
  description,
  iconKey = '',
  slug,
  delay = 0,
}) {
  const Icon = icons[iconKey]

  if (!Icon) {
    console.error(
      `❌ iconKey "${iconKey}" is invalid. Available keys: ${Object.keys(icons).join(', ')}`
    )
    return (
      <div className="p-4 border border-red-300 text-red-600 rounded-xl">
        Problème d’icône : "{iconKey}" n’est pas défini.
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay }}
    >
      <Link
        to={`/services/${slug}`}
        className="block bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-lg hover:scale-[1.01] transition-transform duration-300 group"
        aria-label={`Découvrir le service ${title}`}
      >
        <div className="flex items-start gap-5">
          <div className="flex-shrink-0 bg-greendev-light p-3 rounded-xl">
            <Icon className="h-6 w-6 text-greendev" />
          </div>
          <div>
            <h3 className="text-lg font-poppins font-semibold text-greendev">
              {title}
            </h3>
            <p className="mt-2 text-sm font-inter text-greendev-text leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-4 text-sm font-medium text-greendev hover:text-greendev-accent">
          En savoir plus →
        </div>
      </Link>
    </motion.div>
  )
}
